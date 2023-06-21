import type { ExtractPropTypes } from 'vue';
import { defineComponent } from 'vue';
export const CustomDemoProps = () => ({
  text: String,
});
export type CustomDemoProps = Partial<ExtractPropTypes<ReturnType<typeof CustomDemoProps>>>;
const CustomDemo = defineComponent({
  name: 'ACustomDemo',
  props: CustomDemoProps(),
  setup(props) {
    return () => <button class="customClass">{props.text}</button>;
  },
});

export default CustomDemo;
