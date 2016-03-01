import React from 'react';
import {render} from 'react-dom';
import {FormCtl} from 'components/FormCtl';
import Test from '../Test';
import {Input, FormGroup} from 'amazeui-react';

class TestView extends FormCtl {
  onShow() {
    this.state = {
      form: {
        user: {
          name: 'Teedy'
        },
        selectA:'v3',
        selectB:['v2', 'v4']
      }
    };
  }
  render() {
    console.log('render state: ' + JSON.stringify(this.state));
    return (
      <form className="am-form">
        <Input type="text" label="用户名" valueLink={this.bind(this.state.form.user, 'name')} placeholder="输入用户名"/>
        <Input type="password" label="密码" valueLink={this.bind(this.state.form.user, 'password')} placeholder="输入密码"/>
        <Input type="date" label="用户名" valueLink={this.bind(this.state.form.user, 'date')} placeholder="输入Date"/>
        <Input type="checkbox" name="selectMe" label="选我选我选我" checkedLink={this.bind(this.state.form.user, 'selectMe', '选我')} />
        <Input type="radio" name="selectOne" checkedLink={this.bind(this.state.form.user, 'selectOne', '选项 1')} label="单选框 - 选项 1" />
        <Input type="radio" name="selectOne" checkedLink={this.bind(this.state.form.user, 'selectOne', '选项 2')} label="单选框 - 选项 2" />
        <FormGroup>
          <label>多选(指定值)：</label>
          <Input type="checkbox" checkedLink={this.bindArray(this.state.form, 'checkboxA', 0, '选我')} label="选我" inline/>
          <Input type="checkbox" checkedLink={this.bindArray(this.state.form, 'checkboxA', 1, '也可以选我')} label="也可以选我" inline/>
          <Input type="checkbox" checkedLink={this.bindArray(this.state.form, 'checkboxA', 2, '还可以选我')} label="还可以选我" inline/>
        </FormGroup>
        <FormGroup>
          <label>多选(true false 数组)：</label>
          <Input type="checkbox" checkedLink={this.bindArray(this.state.form, 'checkboxB', 0)} label="选我" inline/>
          <Input type="checkbox" checkedLink={this.bindArray(this.state.form, 'checkboxB', 1)} label="也可以选我" inline/>
          <Input type="checkbox" checkedLink={this.bindArray(this.state.form, 'checkboxB', 2)} label="还可以选我" inline/>
        </FormGroup>
        <Input type="select" label="单选框" valueLink={this.bind(this.state.form, 'selectA')}>
          <option value="选项 1">选项 1</option>
          <option value="选项 2">选项 2</option>
          <option value="选项 3">选项 3</option>
          <option value="选项 4">选项 4</option>
        </Input>
        <Input type="select" label="多选框(用户体验不好，不支持绑定)" multiple onChange={(e)=>{
            console.log(e.target.children);
          }}>
          <option value="v1">选项 - 1</option>
          <option value="v2">选项 - 2</option>
          <option value="v3">选项 - 3</option>
          <option value="v4">选项 - 4</option>
        </Input>
      </form>
    );
  }
}

render((
  <Test>
    <TestView/>
  </Test>
), document.getElementById('app'));
