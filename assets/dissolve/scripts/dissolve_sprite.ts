
import { _decorator, Component, Node, ModelComponent, Vec2, CCInteger, v2, Vec3, Vec4, Material, Sprite} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('dissolve_sprite')
export class dissolve_sprite extends Component {

    private m_material : Material = null!;

    @property(Sprite)
    private m_sprite : Sprite = null!;

    @property(ModelComponent)
    private m_model : ModelComponent = null!;

    private m_value = 1.0;

    @property
    private m_speed = 0.01;
    private m_started = true;

    start() {
        if(this.m_sprite)
            this.m_material = this.m_sprite?.customMaterial!;
        
        if(this.m_model)
            this.m_material = this.m_model.material!;
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