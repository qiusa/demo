import React, {
    Component
} from 'react';
import ReactDOM, {
    render
} from 'react-dom';
import anime from './anime.js'
/**
 * toast提示框
 */
class Toast extends Component {
    state = {
        msg: '' //提示信息
    }

    /**
     * 显示toast
     * @param  {String} msg 提示信息
     */
    showToast(msg) {
        this.setState({
            msg: msg
        })
        this.refs.tip.style.display = 'block';
        if (this.alternate) { //如果存在就重新开始动画
            this.alternate.restart();
        } else {
            this.alternate = anime({
                targets: '#tip',
                opacity: [0, 1],
                translateY: [0, 0],
                direction: 'alternate',
                complete: function() {
                    this.refs.tip.style.display = 'none';
                }.bind(this)
            });
        }
    }
    render() {
        return (
            <div className="m-toast error-tip" id="tip" ref="tip">
                <p>{this.state.msg}</p>
            </div>
        );
    }
}

export default Toast