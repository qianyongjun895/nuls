/*
 * MIT License
 *
 * Copyright (c) 2017-2018 nuls.io
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * @author: Facjas
 * @date: 2018/5/8
 */
package io.nuls.accout.ledger.rpc;

import io.nuls.account.ledger.base.service.LocalUtxoService;
import io.nuls.account.ledger.base.util.AccountLegerUtils;
import io.nuls.account.ledger.constant.AccountLedgerErrorCode;
import io.nuls.account.ledger.model.TransactionInfo;
import io.nuls.account.ledger.service.AccountLedgerService;
import io.nuls.account.model.Address;
import io.nuls.account.model.Balance;
import io.nuls.account.service.AccountService;
import io.nuls.accout.ledger.rpc.dto.*;
import io.nuls.accout.ledger.rpc.form.TransferFeeForm;
import io.nuls.accout.ledger.rpc.form.TransferForm;
import io.nuls.accout.ledger.rpc.util.UtxoDtoComparator;
import io.nuls.core.tools.crypto.Base58;
import io.nuls.core.tools.log.Log;
import io.nuls.core.tools.page.Page;
import io.nuls.core.tools.str.StringUtils;
import io.nuls.kernel.cfg.NulsConfig;
import io.nuls.kernel.constant.KernelErrorCode;
import io.nuls.kernel.constant.NulsConstant;
import io.nuls.kernel.constant.TxStatusEnum;
import io.nuls.kernel.context.NulsContext;
import io.nuls.kernel.exception.NulsException;
import io.nuls.kernel.exception.NulsRuntimeException;
import io.nuls.kernel.func.TimeService;
import io.nuls.kernel.lite.annotation.Autowired;
import io.nuls.kernel.lite.annotation.Component;
import io.nuls.kernel.model.*;
import io.nuls.kernel.utils.AddressTool;
import io.nuls.kernel.utils.TransactionFeeCalculator;
import io.nuls.kernel.utils.VarInt;
import io.nuls.ledger.constant.LedgerErrorCode;
import io.nuls.ledger.service.LedgerService;
import io.swagger.annotations.*;
import org.spongycastle.util.Arrays;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * author Facjas
 * date 2018/5/14.
 */

@Path("/accountledger")
@Api(value = "/accountledger", description = "accountledger")
@Component
public class AccountLedgerResource {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountLedgerService accountLedgerService;

    @Autowired
    private LedgerService ledgerService;

    @Autowired
    private LocalUtxoService localUtxoService;

    @GET
    @Path("/balance/{address}")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "账户地址查询账户余额", notes = "result.data: balanceJson 返回对应的余额信息")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success", response = Balance.class)
    })
    public RpcClientResult getBalance(@ApiParam(name = "address", value = "账户地址", required = true)
                                      @PathParam("address") String address) {
        byte[] addressBytes = null;
        try {
            addressBytes = Base58.decode(address);
        } catch (Exception e) {
            return Result.getFailed(AccountLedgerErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }
        if (addressBytes.length != AddressTool.HASH_LENGTH) {
            return Result.getFailed(AccountLedgerErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }

        Result result = null;
        try {
            result = accountLedgerService.getBalance(addressBytes);
        } catch (NulsException e) {
            e.printStackTrace();
            return Result.getFailed(AccountLedgerErrorCode.UNKNOW_ERROR).toRpcClientResult();
        }

        if (result == null) {
            return Result.getFailed(AccountLedgerErrorCode.UNKNOW_ERROR).toRpcClientResult();
        }
        return result.toRpcClientResult();
    }

    @POST
    @Path("/transfer")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "转账", notes = "result.data: resultJson 返回转账结果")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success")
    })
    public RpcClientResult transfer(@ApiParam(name = "form", value = "转账", required = true) TransferForm form) {
        if (form == null) {
            return Result.getFailed(AccountLedgerErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }
        if (!Address.validAddress(form.getAddress())) {
            return Result.getFailed(AccountLedgerErrorCode.ADDRESS_ERROR).toRpcClientResult();
        }
        if (!Address.validAddress(form.getToAddress())) {
            return Result.getFailed(AccountLedgerErrorCode.ADDRESS_ERROR).toRpcClientResult();
        }
        if (form.getAmount() <= 0) {
            return Result.getFailed(AccountLedgerErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }
        if (!validTxRemark(form.getRemark())) {
            return Result.getFailed(AccountLedgerErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }

        Na value = Na.valueOf(form.getAmount());
        return accountLedgerService.transfer(AddressTool.getAddress(form.getAddress()),
                AddressTool.getAddress(form.getToAddress()),
                value, form.getPassword(), form.getRemark(), TransactionFeeCalculator.MIN_PRECE_PRE_1024_BYTES).toRpcClientResult();
    }


    @GET
    @Path("/transfer/fee")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "转账手续费", notes = "result.data: resultJson 返回转账结果")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success")
    })
    public RpcClientResult transferFee(@BeanParam() TransferFeeForm form) {
        if (form == null) {
            return Result.getFailed(KernelErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }
        if (!Address.validAddress(form.getAddress())) {
            return Result.getFailed(AccountLedgerErrorCode.ADDRESS_ERROR).toRpcClientResult();
        }
        if (!Address.validAddress(form.getToAddress())) {
            return Result.getFailed(AccountLedgerErrorCode.ADDRESS_ERROR).toRpcClientResult();
        }
        if (form.getAmount() <= 0) {
            return Result.getFailed(KernelErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }
        if (!validTxRemark(form.getRemark())) {
            return Result.getFailed(KernelErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }

        Na value = Na.valueOf(form.getAmount());
        return accountLedgerService.transferFee(AddressTool.getAddress(form.getAddress()),
                AddressTool.getAddress(form.getToAddress()), value, form.getRemark(), TransactionFeeCalculator.MIN_PRECE_PRE_1024_BYTES).toRpcClientResult();
    }


    @GET
    @Path("/tx/list/{address}")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "账户地址查询交易列表", notes = "result.data: balanceJson 返回账户相关的交易列表")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success", response = Page.class)
    })
    public RpcClientResult getTxInfoList(@ApiParam(name = "address", value = "账户地址", required = true)
                                         @PathParam("address") String address,
                                         @ApiParam(name = "type", value = "类型")
                                         @QueryParam("type") Integer type,
                                         @ApiParam(name = "pageNumber", value = "页码")
                                         @QueryParam("pageNumber") Integer pageNumber,
                                         @ApiParam(name = "pageSize", value = "每页条数")
                                         @QueryParam("pageSize") Integer pageSize) {
        if (null == pageNumber || pageNumber == 0) {
            pageNumber = 1;
        }
        if (null == pageSize || pageSize == 0) {
            pageSize = 10;
        }
        if (pageNumber < 0 || pageSize < 0 || pageSize > 100) {
            return Result.getFailed(KernelErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }
        if (type == null || type <= 0) {
            type = -1;
        }

        byte[] addressBytes = null;
        Result dtoResult = Result.getSuccess();

        try {
            addressBytes = Base58.decode(address);
        } catch (Exception e) {
            return Result.getFailed(AccountLedgerErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }

        Result<List<TransactionInfo>> rawResult = accountLedgerService.getTxInfoList(addressBytes);
        if (rawResult.isFailed()) {
            dtoResult.setSuccess(false);
            dtoResult.setErrorCode(rawResult.getErrorCode());
            return dtoResult.toRpcClientResult();
        }

        List<TransactionInfo> result = new ArrayList<TransactionInfo>();
        if (type == -1) {
            result = rawResult.getData();
        } else {
            for (TransactionInfo txInfo : rawResult.getData()) {
                if (txInfo.getTxType() == type) {
                    result.add(txInfo);
                }
            }
        }

        Page<TransactionInfoDto> page = new Page<>(pageNumber, pageSize, result.size());
        int start = pageNumber * pageSize - pageSize;
        if (start >= page.getTotal()) {
            dtoResult.setData(page);
            return dtoResult.toRpcClientResult();
        }

        int end = start + pageSize;
        if (end > page.getTotal()) {
            end = (int) page.getTotal();
        }

        List<TransactionInfoDto> infoDtoList = new ArrayList<>();
        for (int i = start; i < end; i++) {
            TransactionInfo info = result.get(i);
            Transaction tx = ledgerService.getTx(info.getTxHash());
            if (tx == null) {
                tx = accountLedgerService.getUnconfirmedTransaction(info.getTxHash()).getData();
            }
            if (tx == null) {
                continue;
            }
            info.setInfo(tx.getInfo(addressBytes));
            infoDtoList.add(new TransactionInfoDto(info));

        }
        page.setList(infoDtoList);

        dtoResult.setSuccess(true);
        dtoResult.setData(page);
        return dtoResult.toRpcClientResult();
    }

    @GET
    @Path("/utxo/lock/{address}")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "查询用户冻结列表", notes = "result.data: balanceJson 返回账户相关的冻结UTXO列表")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success", response = Page.class)
    })
    public RpcClientResult getLockUtxo(@ApiParam(name = "address", value = "地址")
                                       @PathParam("address") String address,
                                       @ApiParam(name = "pageNumber", value = "页码")
                                       @QueryParam("pageNumber") Integer pageNumber,
                                       @ApiParam(name = "pageSize", value = "每页条数")
                                       @QueryParam("pageSize") Integer pageSize) {
        if (null == pageNumber || pageNumber == 0) {
            pageNumber = 1;
        }
        if (null == pageSize || pageSize == 0) {
            pageSize = 10;
        }
        if (pageNumber < 0 || pageSize < 0 || pageSize > 100) {
            return Result.getFailed(KernelErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }

        byte[] addressBytes = null;
        Result dtoResult = new Result<>();

        try {
            addressBytes = Base58.decode(address);
        } catch (Exception e) {
            return Result.getFailed(AccountLedgerErrorCode.ADDRESS_ERROR).toRpcClientResult();
        }
        //获取所有锁定的utxo
        Result<List<Coin>> result = accountLedgerService.getLockedUtxo(addressBytes);
        if (result.isFailed()) {
            dtoResult.setSuccess(false);
            dtoResult.setErrorCode(result.getErrorCode());
            return dtoResult.toRpcClientResult();
        }

        List<Coin> coinList = result.getData();
        Page<UtxoDto> page = new Page<>(pageNumber, pageSize, result.getData().size());
        int start = pageNumber * pageSize - pageSize;
        if (start >= coinList.size()) {
            dtoResult.setData(page);
            return dtoResult.toRpcClientResult();
        }

        List<UtxoDto> utxoDtoList = new ArrayList<>();
        byte[] txHash = new byte[NulsDigestData.HASH_LENGTH];
        for (Coin coin : coinList) {
            //找到每一条uxto，对应的交易类型与时间
            System.arraycopy(coin.getOwner(), 0, txHash, 0, NulsDigestData.HASH_LENGTH);
            Transaction tx = ledgerService.getTx(txHash);
            if (tx == null) {
                NulsDigestData hash = new NulsDigestData();
                try {
                    hash.parse(txHash);
                    tx = accountLedgerService.getUnconfirmedTransaction(hash).getData();
                } catch (NulsException e) {
                    Log.error(e);
                    return Result.getFailed(KernelErrorCode.DATA_PARSE_ERROR).toRpcClientResult();
                }
            }
            //考虑到数据回滚，会出现找不到的情况
            if (tx == null) {
                continue;
            }
            utxoDtoList.add(new UtxoDto(coin, tx));
        }

        //重新赋值page对象
        page = new Page<>(pageNumber, pageSize, utxoDtoList.size());
        if (start >= page.getTotal()) {
            dtoResult.setData(page);
            return dtoResult.toRpcClientResult();
        }

        Collections.sort(utxoDtoList, UtxoDtoComparator.getInstance());
        int end = start + pageSize;
        if (end > utxoDtoList.size()) {
            end = utxoDtoList.size();
        }

        page.setList(utxoDtoList.subList(start, end));
        dtoResult.setSuccess(true);
        dtoResult.setData(page);
        return dtoResult.toRpcClientResult();
    }

    private boolean validTxRemark(String remark) {
        if (StringUtils.isBlank(remark)) {
            return true;
        }
        try {
            byte[] bytes = remark.getBytes(NulsConfig.DEFAULT_ENCODING);
            if (bytes.length > 100) {
                return false;
            }
            return true;
        } catch (UnsupportedEncodingException e) {
            return false;
        }
    }

    @GET
    @Path("/tx/{hash}")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "根据hash查询交易")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success", response = TransactionDto.class)
    })
    public RpcClientResult getTxByHash(@ApiParam(name="hash", value="交易hash", required = true)
                                       @PathParam("hash") String hash) {
        if (StringUtils.isBlank(hash)) {
            return Result.getFailed(LedgerErrorCode.NULL_PARAMETER).toRpcClientResult();
        }
        if (!NulsDigestData.validHash(hash)) {
            return Result.getFailed(LedgerErrorCode.PARAMETER_ERROR).toRpcClientResult();
        }

        //return result.toRpcClientResult();
        return null;
    }

    /**
     * 获取未确认的交易
     * @param hash
     * @return
     */
    private Result getUnconfirmedTx(String hash){
        Result result = null;
        try {
            Result<Transaction> txResult = accountLedgerService.getUnconfirmedTransaction(NulsDigestData.fromDigestHex(hash));
            if (txResult.isFailed() || null == txResult.getData()) {
                result = Result.getFailed(LedgerErrorCode.DATA_NOT_FOUND);
            } else {
                Transaction tx = txResult.getData();
                tx.setStatus(TxStatusEnum.CONFIRMED);
                TransactionDto txDto = null;
                CoinData coinData = tx.getCoinData();
                if(coinData != null) {
                    // 组装from数据
                    List<Coin> froms = coinData.getFrom();
                    if(froms != null && froms.size() > 0) {
                        byte[] fromHash, owner;
                        int fromIndex;
                        NulsDigestData fromHashObj;
                        Transaction fromTx;
                        Coin fromUtxo;
                        for(Coin from : froms) {
                            owner = from.getOwner();
                            // owner拆分出txHash和index
                            fromHash = AccountLegerUtils.getTxHashBytes(owner);
                            fromIndex = AccountLegerUtils.getIndex(owner);
                            // 查询from UTXO
                            fromHashObj = new NulsDigestData();
                            fromHashObj.parse(fromHash);
                            //获取上一笔的to,先查未确认,如果没有再查已确认
                            fromTx = accountLedgerService.getUnconfirmedTransaction(fromHashObj).getData();
                            if(null == fromTx){
                                fromTx = ledgerService.getTx(fromHashObj);
                            }
                            fromUtxo = fromTx.getCoinData().getTo().get(fromIndex);
                            from.setFrom(fromUtxo);
                        }
                    }
                    txDto = new TransactionDto(tx);
                    List<OutputDto> outputDtoList = new ArrayList<>();
                    // 组装to数据
                    List<Coin> tos = coinData.getTo();
                    if(tos != null && tos.size() > 0) {
                        byte[] txHashBytes = tx.getHash().serialize();
                        String txHash = hash;
                        OutputDto outputDto = null;
                        Coin to, temp;
                        long bestHeight = NulsContext.getInstance().getBestHeight();
                        long currentTime = TimeService.currentTimeMillis();
                        long lockTime;
                        for(int i = 0, length = tos.size(); i < length; i++) {
                            to = tos.get(i);
                            outputDto = new OutputDto(to);
                            outputDto.setTxHash(txHash);
                            outputDto.setIndex(i);
                            temp = ledgerService.getUtxo(Arrays.concatenate(txHashBytes, new VarInt(i).encode()));
                            if(temp == null) {
                                // 已花费
                                outputDto.setStatus(3);
                            } else {
                                lockTime = temp.getLockTime();
                                if (lockTime < 0) {
                                    // 共识锁定
                                    outputDto.setStatus(2);
                                } else if (lockTime == 0) {
                                    // 正常未花费
                                    outputDto.setStatus(0);
                                } else if (lockTime > NulsConstant.BlOCKHEIGHT_TIME_DIVIDE) {
                                    // 判定是否时间高度锁定
                                    if (lockTime > currentTime) {
                                        // 时间高度锁定
                                        outputDto.setStatus(1);
                                    } else {
                                        // 正常未花费
                                        outputDto.setStatus(0);
                                    }
                                } else {
                                    // 判定是否区块高度锁定
                                    if (lockTime > bestHeight) {
                                        // 区块高度锁定
                                        outputDto.setStatus(1);
                                    } else {
                                        // 正常未花费
                                        outputDto.setStatus(0);
                                    }
                                }
                            }
                            outputDtoList.add(outputDto);
                        }
                    }
                    txDto.setOutputs(outputDtoList);
                    // 计算交易实际发生的金额
                    calTransactionValue(txDto);
                }
                result = Result.getSuccess();
                result.setData(txDto);
            }
        } catch (NulsRuntimeException re) {
            Log.error(re);
            result = new Result(false, re.getCode(), re.getMessage());
        } catch (Exception e) {
            Log.error(e);
            result = Result.getFailed(LedgerErrorCode.SYS_UNKOWN_EXCEPTION);
        }
        return result;
    }

    /**
     * 获取已确认的交易
     * @param hash
     * @return
     */
    private Result getConfirmedTx(String hash){
        Result result = null;
        try {
            Transaction tx = ledgerService.getTx(NulsDigestData.fromDigestHex(hash));
            if (tx == null) {
                result = Result.getFailed(LedgerErrorCode.DATA_NOT_FOUND);
            } else {
                tx.setStatus(TxStatusEnum.CONFIRMED);
                TransactionDto txDto = null;
                CoinData coinData = tx.getCoinData();
                if(coinData != null) {
                    // 组装from数据
                    List<Coin> froms = coinData.getFrom();
                    if(froms != null && froms.size() > 0) {
                        byte[] fromHash, owner;
                        int fromIndex;
                        NulsDigestData fromHashObj;
                        Transaction fromTx;
                        Coin fromUtxo;
                        for(Coin from : froms) {
                            owner = from.getOwner();
                            // owner拆分出txHash和index
                            fromHash = AccountLegerUtils.getTxHashBytes(owner);
                            fromIndex = AccountLegerUtils.getIndex(owner);
                            // 查询from UTXO
                            fromHashObj = new NulsDigestData();
                            fromHashObj.parse(fromHash);
                            fromTx = ledgerService.getTx(fromHashObj);
                            fromUtxo = fromTx.getCoinData().getTo().get(fromIndex);
                            from.setFrom(fromUtxo);
                        }
                    }
                    txDto = new TransactionDto(tx);
                    List<OutputDto> outputDtoList = new ArrayList<>();
                    // 组装to数据
                    List<Coin> tos = coinData.getTo();
                    if(tos != null && tos.size() > 0) {
                        byte[] txHashBytes = tx.getHash().serialize();
                        String txHash = hash;
                        OutputDto outputDto = null;
                        Coin to, temp;
                        long bestHeight = NulsContext.getInstance().getBestHeight();
                        long currentTime = TimeService.currentTimeMillis();
                        long lockTime;
                        for(int i = 0, length = tos.size(); i < length; i++) {
                            to = tos.get(i);
                            outputDto = new OutputDto(to);
                            outputDto.setTxHash(txHash);
                            outputDto.setIndex(i);
                            temp = (Coin) localUtxoService.getUtxo(Arrays.concatenate(txHashBytes, new VarInt(i).encode())).getData();
                            if(temp == null) {
                                // 已花费
                                outputDto.setStatus(3);
                            } else {
                                lockTime = temp.getLockTime();
                                if (lockTime < 0) {
                                    // 共识锁定
                                    outputDto.setStatus(2);
                                } else if (lockTime == 0) {
                                    // 正常未花费
                                    outputDto.setStatus(0);
                                } else if (lockTime > NulsConstant.BlOCKHEIGHT_TIME_DIVIDE) {
                                    // 判定是否时间高度锁定
                                    if (lockTime > currentTime) {
                                        // 时间高度锁定
                                        outputDto.setStatus(1);
                                    } else {
                                        // 正常未花费
                                        outputDto.setStatus(0);
                                    }
                                } else {
                                    // 判定是否区块高度锁定
                                    if (lockTime > bestHeight) {
                                        // 区块高度锁定
                                        outputDto.setStatus(1);
                                    } else {
                                        // 正常未花费
                                        outputDto.setStatus(0);
                                    }
                                }
                            }
                            outputDtoList.add(outputDto);
                        }
                    }
                    txDto.setOutputs(outputDtoList);
                    // 计算交易实际发生的金额
                    calTransactionValue(txDto);
                }
                result = Result.getSuccess();
                result.setData(txDto);
            }
        } catch (NulsRuntimeException re) {
            Log.error(re);
            result = new Result(false, re.getCode(), re.getMessage());
        } catch (Exception e) {
            Log.error(e);
            result = Result.getFailed(LedgerErrorCode.SYS_UNKOWN_EXCEPTION);
        }
        return result;
    }



    /**
     * 计算交易实际发生的金额
     * Calculate the actual amount of the transaction.
     *
     * @param txDto
     */
    private void calTransactionValue(TransactionDto txDto) {
        if(txDto == null) {
            return;
        }
        List<InputDto> inputDtoList = txDto.getInputs();
        Set<String> inputAdressSet = new HashSet<>(inputDtoList.size());
        for(InputDto inputDto : inputDtoList) {
            inputAdressSet.add(inputDto.getAddress());
        }
        Na value = Na.ZERO;
        List<OutputDto> outputDtoList = txDto.getOutputs();
        for(OutputDto outputDto : outputDtoList) {
            if(inputAdressSet.contains(outputDto.getAddress())) {
                continue;
            }
            value = value.add(Na.valueOf(outputDto.getValue()));
        }
        txDto.setValue(value.getValue());
    }

}
