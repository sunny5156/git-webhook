import React from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';

import OnFireMixin from './mixins/onFireMixin.jsx';
import TipShowMixin from './mixins/tipShowMixin.jsx';
import RequestsMixin from './mixins/xhrRequestsMixin.jsx';

const Login = React.createClass({
    __ONFIRE__: 'Login',
    mixins: [RequestsMixin, OnFireMixin, TipShowMixin],  // 引入 mixin    
    getInitialState: function(){
        return {
            username: '',
            password: '',
            loginBtn: '登录'
        }
    },
    render: function(){
        const {loginBtn, username, password, loading} = this.state;
        const loadingClass = loading ? 'loading' : '';
        return(
            <div className="user-login">
                <div className="ui medium header">登录</div>
                <form className="ui form">
                    <div className="field">
                        <label>用户名</label>
                        <input type="text" name="username" value={username} onChange={e=>{this.setState({username: e.target.value})}} placeholder="请输入用户名" />
                    </div>
                    <div className="field">
                        <label>密码</label>
                        <input type="password" name="password" value={password} onChange={e=>{this.setState({password: e.target.value})}} placeholder="请输入密码" />
                    </div>
                    <button className="ui primary button {loadingClass}" type="button" onClick={this.onClick.bind(this)}>{loginBtn}</button>
                    <Link to="/register" style={{color: '#000'}}>注册</Link>
                </form>

                
            </div>
        );
    },

    onClick: function(){
        const {username, password, loading} = this.state;
        if(loading) return;
        this.setState({loading: true});
        this.post('/api/login', {
            username,
            password
        }, function(r){
            this.setState({loading: false})
            r = r.json();
            console.log(r)
            if(r.success === 1){
                this.showSuccess('登录成功')
                hashHistory.push('/')
                window.location.reload()
            }else{
                this.showError(r.data)
            }
        }.bind(this));
        console.log(username, password)
    }
});

export default Login;