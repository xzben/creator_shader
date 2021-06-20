
import { _decorator, Component, Node, ModelComponent, Vec2, CCInteger, v2, Vec3, Vec4, Material, Sprite, CCFloat} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('dissolve')
export class dissolve extends Component {

    private m_material : Material = null!;

    private m_value = 1.0;

    @property({
        type : CCFloat
    })
    private m_speed = 0.01;
    private m_started = true;

    start() {
        let sprite = this.getComponent(Sprite);
        this.m_material = sprite?.customMaterial!;
    }

    private setUnifirom( name : string, value : number | Vec2 | Vec3 | Vec4  ) {
        let material = this.m_material;
        if(material == null)return;
        const pass = material.passes[0];
        pass.setUniform(pass.getHandle(name), value);
    }

    private updateValue(){
        this.setUnifirom("dissolveValue", this.m_value);
    }

    update( dt : number){
        if(!this.m_started) return;
        if(this.m_value <= 0) return;

        this.m_value -= this.m_speed;
        this.updateValue();
    }
}