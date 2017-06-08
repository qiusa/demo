import React, {
    Component
} from 'react'
import './Zen.scss'
import util from '../../../components/util.js'
import Spinner from 'react-spinkit'

export default class Zen extends Component {
    state = {
        index: 1,
        sendValue: '',
        enter: {
            roomid: '',
            pushUrl: ''
        }
    }

    /**
     * 切换导航
     * @param  {Number} index 数字
     */
    nav(index) {
        this.setState({
            index: index,
            sendValue: ''
        });
    }

    /**
     * 校验直播房间号或直播地址是否正确
     * @param  {Obj} param  参数
     * @return {Booleans}     
     */
    valiate(param) {
        return false;
    }

    /**
     * 进入直播
     */
    enterPlay(key) {
        if (!util.trim(this.state.sendValue)) {
            alert("输入框不能为空");
            return;
        }
        let param = {}
        if (this.state.index === 1) {//房间号
            param.roomid = util.trim(this.state.sendValue)
        } else {//直播流
            param.pushUrl = util.trim(this.state.sendValue)
        }
        let isPass = this.valiate(param);
        if (isPass) {
            if (this.state.index === 1) {
                alert('房间号错误')
                return
            } else {
                alert('拉流地址错误')
                return
            }
        }
        console.info('send',param)
        window.location.href = '/?roomid=' + param.roomid;
        
    }

    handleChange(event) {
        this.setState({sendValue:event.target.value})
    }
    /**
     * 移开输入框事件
     */
    inputBlur() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
    focusInput() {
        this.interval = setInterval(function() {
            //document.body.scrollTop = document.body.scrollHeight
        }, 100)
    }
    render() {
            return (
                    <div className="m-nav">
                        <ul className="nav-list">
                            <li className={this.state.index === 1 ? 'cur' : ''} onClick={this.nav.bind(this, 1)}>房间号观看</li>
                            <li className={this.state.index === 2 ? 'cur' : ''} onClick={this.nav.bind(this, 2)}>拉流地址</li>
                        </ul>
                        <div className="box">
                            <input type={this.state.index === 1 ? 'tel' : 'text'} className="text-input mt10" placeholder={this.state.index === 1 ? "请输入房间号" : "请输入拉流地址"} value={this.state.sendValue} onChange={this.handleChange.bind(this)} onFocus={this.focusInput.bind(this)}/>
                            <span href="javascript:;" className="btn mt10" onClick={this.enterPlay.bind(this)}>进入直播</span>
                        </div>
                    </div>
        )
    }
}

Zen.propTypes = {
    zen: React.PropTypes.object.isRequired
}