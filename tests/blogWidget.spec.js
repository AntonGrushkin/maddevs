import {mount} from '@vue/test-utils';
import BlogWidget from '../client/components/Blog/BlogWidget';
import blogPost from './__mocks__/blogPost';

describe('Recommended blog widget component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BlogWidget, {
      mocks: {
        $prismic: {
          asText: text => text[0].text
        }
      },
      propsData: {post: blogPost},
      stubs: ['nuxt-link']
    });
  });

  test('is a Vue component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
