import React from 'react';
import {
    AppRegistry,
    asset,
    StyleSheet,
    Pano,
    Text,
    View,
    Model,
    AmbientLight
} from 'react-vr';


export default class react_vr_demo extends React.Component {
    constructor() {
        super();
        this.state = {
            depth1: -800,
            depth2: -900,
            depth3: -1000,
            rotation: -20,
            zoom: -70,
        };
        this.lastUpdate = Date.now();
        this.whirlpoolMap = [
            '../static_assets/whirlpool_rt.png',
            '../static_assets/whirlpool_lf.png',
            '../static_assets/whirlpool_up.png',
            '../static_assets/whirlpool_dn.png',
            '../static_assets/whirlpool_bk.png',
            '../static_assets/whirlpool_ft.png'
        ];
        this.styles = StyleSheet.create({
            menu: {
                flex: 1,
                flexDirection: 'column',
                width: 1,
                alignItems: 'stretch',
                transform: [{translate: [2, 2, -5]}],
            },
        });

        this.rotate = this.rotate.bind(this);
        this.depth = this.depth.bind(this);
    }

    componentDidMount() {
        this.rotate();
        this.depth();
    }

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
        if (this.depthFrameHandle) {
            cancelAnimationFrame(this.depthFrameHandle);
            this.depthFrameHandle = null;
        }
    }

    rotate() {
        const now = Date.now();
        const delta = now - this.lastUpdate;
        this.lastUpdate = now;

        this.setState({
            rotation: this.state.rotation + delta /50
        });
        this.frameHandle = requestAnimationFrame(this.rotate);
    }

    depth() {
        const now = Date.now();
        const delta = now - this.lastUpdate;
        this.lastUpdate = now;


        this.setState({
            depth1: this.state.depth1 > 0 ? -1000 : this.state.depth1 + delta  * 3,
            depth2: this.state.depth2 > 0 ? -1000 : this.state.depth2 + delta /100,
            depth3: this.state.depth3 > 0 ? -1000 : this.state.depth3 + delta * 9,
        });

        this.depthFrameHandle = requestAnimationFrame(this.depth);
    }

    render() {
        return (
            <View>

            <Pano source={ {uri: this.whirlpoolMap} }/>


    <AmbientLight intensity={ 2.6 }  />

            <Model
        style={{
            transform: [
                {translate: [0,0,this.state.depth3]},
                {scale: 0.05 },
                {rotateY: 0},
                {rotateX: -20},
                {rotateZ: 0}
            ],
        }}
        source={{obj:asset('plants1.obj'), mtl:asset('plants1.mtl')}}
        lit={true}
            />


            <Model
        style={{
            transform: [
                {translate: [-80,-140,450]},
                {scale: 0.05 },
                {rotateY: 0},
                {rotateX: -20},
                {rotateZ: 0}
            ],
        }}
        source={{obj:asset('flower 04.obj'), mtl:asset('flower 04.mtl')}}
        lit={true}
            />

            <Model
        style={{
            transform: [
                {translate: [250,-80,-350]},
                {scale: 0.05 },
                {rotateY: 0},
                {rotateX: 0},
                {rotateZ: this.state.rotation}
            ],
        }}
        source={{obj:asset('plants4.obj'), mtl:asset('plants4.mtl')}}
        lit={false}
            />

            <Model
        style={{
            transform: [
                {translate: [50,-80,-450]},
                {scale: 0.05 },
                {rotateY: 0},
                {rotateX: 0},
                {rotateZ: 0}
            ],
        }}
        source={{obj:asset('plants3.obj'), mtl:asset('plants3.mtl')}}
        lit={false}
            />
            <Model
        style={{
            transform: [
                {translate: [-200,-80,-350]},
                {scale: 0.05 },
                {rotateY: 0},
                {rotateX: 0},
                {rotateZ: 0}
            ],
        }}
        source={{obj:asset('plants3.obj'), mtl:asset('plants3.mtl')}}
        lit={false}
            />

            <Model
        style={{
            transform: [
                {translate: [-120,-80,-350]},
                {scale: 0.05 },
                {rotateY: 0},
                {rotateX: 0},
                {rotateZ: this.state.rotation}
            ],
        }}
        source={{obj:asset('plants2.obj'), mtl:asset('plants2.mtl')}}
        lit={true}
            />

            </View>
    );
    }
};

AppRegistry.registerComponent('react_vr_demo', () => react_vr_demo);
