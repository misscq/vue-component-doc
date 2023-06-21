import { defineComponent } from 'vue';
import { Row,Col } from "ant-design-vue";
export default defineComponent({
  components:{
    Row,
    Col,
  },
  props: {
    cols: {
      type: [Number, String],
      default: 2,
    },
  },
  setup() {
    return {
    };
  },
  render() {
    const { cols, $slots } = this;
    // 手机访问强制开启单行 demo 模式
    const isSingleCol = cols === 1 || false;
    const leftChildren = [];
    const rightChildren = [];
    const children = $slots.default?.() || [];
    children.forEach((demo, index) => {
      if (index % 2 === 0 || isSingleCol) {
        leftChildren.push(demo);
      } else {
        rightChildren.push(demo);
      }
    });
    return (
      <Row gutter={16}>
        <Col
          span={isSingleCol ? 24 : 12}
          class={isSingleCol ? 'code-boxes-col-1-1' : 'code-boxes-col-2-1'}
        >
          {leftChildren}
        </Col>
        {isSingleCol ? null : (
          <Col class="code-boxes-col-2-1" span={12}>
            {rightChildren}
          </Col>
        )}
      </Row>
    );
  },
});
