import React, { useEffect, useState } from 'react';
import {
  ILowCodePluginContext,
} from '@alilc/lowcode-engine';
import { Select } from '@alifd/next';
// import scenarios from '../../universal/scenarios';
const { Option } = Select;

const getCurrentScenarioName = () => {
  // return 'index'
  // const list = location.href.split('/');
  // return list[list.length - 1].replace('.html', '');
  return new URLSearchParams(location.search.slice(1)).get('scenario') || 'lowcode_index';
}

function Switcher(props: any) {
  const [scenarios, setScenarios] = useState([]);

  const getInitValue = async () => {
    const res = await fetch(`http://192.168.8.116/hackthon/list`).then(r => r.json());
    const scenarios = res.data.map(i => i.dict_key);
    setScenarios(scenarios);
  }

  useEffect(() => {
    getInitValue();
  }, []);

  return (<Select
    id="basic-demo"
    onChange={(val) => location.href = `/?scenario=${val}`}
    defaultValue={getCurrentScenarioName()}
    style={{ width: 220 }}
    placeholder="请选择应用"
  >
    {
      scenarios.map((scenario: any) => <Option value={scenario}>{scenario}</Option>)
    }
  </Select>)
}

export const scenarioSwitcher = (ctx: ILowCodePluginContext) => {
  return {
    name: 'scenarioSwitcher',
    async init() {
      const { skeleton } = ctx;

      skeleton.add({
        name: 'scenarioSwitcher',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
          width: 80,
        },
        content: Switcher,
      });
    },
  };
};
scenarioSwitcher.pluginName = 'scenarioSwitcher';