import React, {Component} from 'react';
import {render} from 'react-dom';
import {
  Icon,
  Input,
  ButtonToolbar,
  Button,
  Grid,
  Col
} from 'amazeui-react';
import {Fmk} from 'components/Fmk';
import {FmkCtl} from 'components/FmkCtl';

let child;
export default class Test extends FmkCtl {
  onShow(){
    child = React.Children.only(this.props.children);
    this.state = {
      showChild: true,
      form: {
        ...child.props
      },
      showHandlerAndAction: Test.showHandlerAndAction
    };
    Fmk.getDispatcher().register((payload) => {
      if (Test.showHandlerAndAction) {
        alert(JSON.stringify(payload));
      }
    });
  }

  bindStoreEvent(binder){}

  static handler() {
    if (Test.showHandlerAndAction) {
      let msg = [];
      for (let k in arguments) {
        msg.push(arguments[k]);
      }
      try {
        alert(JSON.stringify(msg));
      } catch (e) {
        alert(e.message + '\n已在控制台输出。');
        console.log(msg);
      }
    }
  }

  getAllProps = () => {
    let result = [];
    // let child = React.Children.only(this.props.children);
    for (var p in this.state.form) {
      if (p !== 'children') {
        let val = this.state.form[p];
        if (typeof val === 'object') {
          val = JSON.stringify(val);
        }
        if (typeof val === 'function') {
          result.push(<Input key={p} type="text" readOnly name={p} label={p + '(' + (typeof child.props[p]) + ')'} value='Handler' onChange={this.onChange}/>);
        } else {
          result.push(<Input key={p} type="textarea" name={p} label={p + '(' + (typeof child.props[p]) + ')'} value={val} onChange={this.onChange}/>);
        }
      }
    }
    return result;
  }

  onChange = (e) => {
    let nf = {
      ...this.state.form
    };
    nf[e.target.name] = e.target.value;
    this.setState({form: nf});
  }

  reload = () => {
    this.setState({showChild: false});
    this.forceUpdate(() => {
      setTimeout(() => {
        this.setState({showChild: true});
      }, 100);
    });
  }

  load = (show) => {
    return show
      ? child
      : <Icon spin icon="cog"/>;
  }

  updateChild = () => {
    // let child = React.Children.only(this.props.children);
    let np = {
      ...child.props
    };
    for (var p in this.state.form) {
      if (p !== 'children') {
        if (typeof child.props[p] === 'object' && typeof this.state.form[p] !== 'object') {
          np[p] = JSON.parse(this.state.form[p]);
        } else {
          np[p] = this.state.form[p];
        }
      }
    }
    child = React.cloneElement(child, np);
    this.reload();
  }

  render() {
    return (
      <div>
        <Grid className="doc-g" style={{
          margin: 10
        }}>
          <Col sm={4}>
            <fieldset>
              <legend>组件props输入</legend>
              <form className="am-form">
                {this.getAllProps()}
                <ButtonToolbar>
                  <Button amStyle="warning" onClick={this.updateChild}>更新</Button>
                  {/*<Button amStyle="warning" style={{float:'right'}}>保存</Button>*/}
                  <Input type="checkbox" label="监控Handler与Action" checked={this.state.showHandlerAndAction} onChange={(e) => {
                    this.setState({showHandlerAndAction: e.target.checked});
                    Test.showHandlerAndAction = e.target.checked;
                  }}/>
                </ButtonToolbar>
              </form>
            </fieldset>
          </Col>
          <Col sm={8}>
            <fieldset style={{
              padding: 10
            }}>
              <legend>组件效果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button amStyle="warning" onClick={this.reload} style={{
                  float: 'right'
                }}>
                  <Icon icon="refresh"/>重新载入
                </Button>
              </legend>
              {this.load(this.state.showChild)}
            </fieldset>
          </Col>
        </Grid>
        <hr/>
      </div>
    );
  }
}

Test.showHandlerAndAction = true;
