
import { _decorator, Component, Node, ModelComponent, Vec2, CCInteger, v2} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Water')
export class Water extends Component {

    @property(ModelComponent)
    private m_model_plane: ModelComponent = null!;

    @property({
        type : Vec2,
        displayName : "随机范围"
    })
    private m_dtRange  = v2(0, 5);

    private m_count = 0;

    start() {
        
    }

    private playWaterEffect(center : Vec2 ) {
        let material = this.m_model_plane.material;
        if(material == null)return;
        const pass = material.passes[0];
        pass.setUniform(pass.getHandle(`center`), center);
    }

    private randomRange() : number{
        let max = this.m_dtRange.y - this.m_dtRange.x;
        let value = Math.ceil(Math.random()*10000);

        value %= (max + 1);

        value += this.m_dtRange.x;

        return value;
    }

    private doRandom(){
        this.m_count = this.randomRange();
        let center =  v2(Math.random(), Math.random());
        this.playWaterEffect(center);
    }

    update( dt : number){
        this.m_count -= dt;
        if(this.m_count <= 0){
           this.doRandom();
        }
    }
}