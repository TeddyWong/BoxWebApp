'use strict';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon, Panel, AvgGrid, Button, Input} from 'amazeui-react';
import {Fmk} from 'components/Fmk';
import {FmkComponent} from 'components/FmkComponent';

export class News extends FmkComponent {
  render() {
    var footer = (
      <div style={{
        textAlign: 'right'
      }}>
        <Icon icon="heart">{this.props.news.love}</Icon>
      </div>
    );
    var header = (
      <AvgGrid sm={4}>
        <li><Button amStyle="secondary" amSize="xs" onClick={this.props.handlePrevious}><Icon icon="angle-double-left"></Icon>前一天</Button></li>
        <li>
          <Icon icon="newspaper-o">{this.props.news.caption}</Icon>
        </li>
        <li style={{
          textAlign: 'right'
        }}>{this.props.news.dateline}</li>
      <li style={{
        textAlign: 'right'
      }}><Button amStyle="secondary" amSize="xs" onClick={this.props.handleNext}>后一天<Icon icon="angle-double-right"></Icon></Button></li>
      </AvgGrid>
    );

    let myStyle={
      width: 500,
      margin: 20
    };

    return (
      <div style={{
        padding: 20
      }}>
        <blockquote style={myStyle}>
          <AvgGrid sm={3}>
            <li>访问计数器：{this.props.counter.count}</li>
            <li><Input type="checkbox" label="开挂" onChange={this.props.cheatHandler}/></li>
            <li style={{display:this.props.cheatEnabled?'':'none'}}><Input type="text" placeholder="加几倍呢？你说了算" onChange={this.props.cheatHandler}/></li>
          </AvgGrid>
        </blockquote>
        <Panel header={header} footer={footer} style={myStyle}>
          <blockquote>
            <p>{this.props.news.content}</p>
            <p>{this.props.news.note}</p>
          </blockquote>
          <img className="am-thumbnail" src={this.props.news.picture2}/>
          <p>
            {this.props.news.translation}
          </p>
        </Panel>
      </div>
    );
  }
}

News.defaultProps = {
  counter: {
    count: 0
  },
  news: {
    picture2: 'images/loading.gif'
  }
};
