import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import Profile from './Profile/Profile';
import ApiKeys from './ApiKeys/ApiKeys';
import Users from './Users/Users';

export default class Settings extends Component {
  render () {
    return (<div>
              <Tabs>
                <Tab label='Profile'>
                  <div>
                    <Profile />
                  </div>
                </Tab>
                <Tab label='Api Keys'>
                  <div>
                    <ApiKeys />
                  </div>
                </Tab>
                <Tab label='Users'>
                  <div>
                    <Users />
                  </div>
                </Tab>
              </Tabs>
            </div>)
  }
}
