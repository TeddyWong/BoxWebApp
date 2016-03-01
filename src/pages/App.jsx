'use strict';
import React from 'react';
import {Link} from 'react-router';
import {
  Grid,
  Col,
  List,
  ListItem,
  Header,
  Icon
} from 'amazeui-react';
import {FmkComponent} from 'components/FmkComponent';
import {LogoutCtl} from 'components/Logout';

export class App extends FmkComponent {
  render() {
    var headerProps = {
      title: <div>加载中</div>,
      link: '#title-link',
      data: {
        left: [
          {
            path: '/',
            link: '#',
            icon: 'home'
          }
        ],
        right: [
          {
            path: 'news',
            link: '#',
            icon: 'calendar'
          }
        ]
      },
      onSelect: this.props.iconClick
    };

    return (
      <div>
        <Grid >
          <Col sm={11}>
            <Header {...headerProps}/>
          </Col>
          <Col sm={1}>
            <LogoutCtl/>
          </Col>
        </Grid>
        <Grid>
          <Col sm={2}>
            <List>
              <ListItem>
                <Link to={'news'}><Icon icon="calendar"/>
                  每日一句</Link>
              </ListItem>
              <ListItem>
                <Link to={'control_statement'}><Icon icon="tags"/>
                  JSX Control Statement</Link>
              </ListItem>
              <ListItem>
                <Link to={'about'}><Icon icon="lightbulb-o"/>
                  关于Demo</Link>
              </ListItem>
            </List>
          </Col>
          <Col sm={10}>{this.props.content}</Col>
        </Grid>
      </div>
    );
  }
}
