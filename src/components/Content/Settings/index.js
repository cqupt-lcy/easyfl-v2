import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Select, InputNumber, Button, Modal, Popconfirm, notification } from "antd"
import { QuestionCircleOutlined } from '@ant-design/icons';
import './index.css'
import { request } from "../../../resource/myaxios";
import { useParams, useLocation } from "react-router-dom";
import { clearResults, updateParameters, updateResults,resetSettings } from "../../../features/itemSlice";
export default function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const item = useSelector(state =>
    state.items.find(item => item.id == (id))
  )

  const dispatch = useDispatch();


  const handleOk = () => {
    setIsModalOpen(false);
    startTraining();
  };
  const handleReset = () =>{
    dispatch(resetSettings(id))
  }
  const openNotification = (msg) => {
    api.open({
      message: '提示信息',
      description: msg,
      duration: 4.5,
      showProgress: true,
      pauseOnHover: true
    });
  };

  const startTraining = async () => {
    dispatch(clearResults({id}))
    await request.post('/train', { ...item.parameters, id: id });
    openNotification("训练开始");
  };

  const stopTraining = async () => {
    await request.post('/stop', { id: id });
    openNotification("训练终止");
  };
  return (
    <div className="settingwrapper">
      {contextHolder}
      <h2>联邦学习训练控制</h2>

      {/* 参数设置部分 */}
      <div className="settingdiv1">
        <label>方法:
          <Select
            className="settingselection"
            value={item.parameters.method}
            onChange={v => {
              dispatch(updateParameters({ id, key: 'method', value: v }))
            }}
            options={[
              { value: 'fedavg', label: 'FedAvg' },
              { value: 'fedprox', label: 'FedProx' },
              { value: 'ca2fl', label: 'Ca2Fl' },
              { value: 'fedasync', label: 'FedAsync' },
              { value: 'fedavgm', label: 'FedAvgm' },
              { value: 'fedbuff', label: 'FedBuff' },
              { value: 'fedtest01', label: 'FedTest' },
            ]}
          />
        </label>
        <label>异质性:
          <Select
            className="settingselection"
            value={item.parameters.heterogeneity}
            onChange={(v) => {
              dispatch(updateParameters({ id, key: 'heterogeneity', value: v }))
            }}
          >
            <Select.Option value={true}>非独立同分布</Select.Option>
            <Select.Option value={false}>独立同分布</Select.Option>
          </Select>
        </label>
        <label>训练方式:
          <Select
            className="settingselection"
            value={item.parameters.isAsync}
            onChange={(v) => {
              dispatch(updateParameters({ id, key: "isAsync", value: v }))
            }} >

            <Select.Option value={true}>异步训练</Select.Option>
            <Select.Option value={false}>同步训练</Select.Option>
          </Select>
        </label>
        <label>数据集:
          <Select
            className="settingselection"
            value={item.parameters.dataset}
            onChange={(v) => {
              dispatch(updateParameters({ id, key: "dataset", value: v }))
            }}
            options={[
              { value: 'BloodMnist', label: 'BloodMnist' },
              { value: 'PathMnist', label: 'PathMnist' },
              { value: 'ISIC2017', label: 'ISIC2017' },
              { value: 'Cifar10', label: 'Cifar-10' },
              { value: 'Cifar100', label: 'Cifar-100' },
            ]}
          />
        </label>
      </div>

      {/* 参数设置第二行 */}
      <div className="settingdiv2">
        <label>学习率:
          <InputNumber min={0} max={10} step={0.1} value={item.parameters.learningRate} onChange={(v) => { dispatch(updateParameters({ id, key: 'learningRate', value: v })) }} />
        </label>
        <label>狄利特雷系数:
          <InputNumber min={0} max={10} step={0.1} value={item.parameters.dirichlet} onChange={(v) => dispatch(updateParameters({ id, key: 'dirichlet', value: v }))} />
        </label>
        <label>客户端数量:
          <InputNumber min={0} max={10000} step={1} value={item.parameters.clientNum} onChange={(v) => dispatch(updateParameters({ id, key: 'clientNum', value: v }))} />
        </label>
      </div>

      {/* 按钮控制 */}
      <div className="settingbutton">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>开始训练</Button>
        <Modal title="确定以当前设置开始训练？" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
          <p>方法：{item.parameters.method}</p>
          <p>异质性：{item.parameters.heterogeneity ? "非独立同分布" : "独立同分布"}</p>
          <p>训练方式：{item.parameters.isAsync ? "异步训练" : "同步训练"}</p>
          <p>数据集：{item.parameters.dataset}</p>
          <p>学习率：{item.parameters.learningRate}</p>
          <p>狄利特雷系数：{item.parameters.dirichlet}</p>
          <p>客户端数量：{item.parameters.clientNum}</p>
        </Modal>
        <Popconfirm title="停止训练" onConfirm={stopTraining} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
          <Button danger type="primary">停止训练</Button>
        </Popconfirm>
        <Button type="primary" onClick={handleReset} style={{backgroundColor:"#520"}}>恢复默认</Button>
      </div>
    </div>
  );
}
