import {
  mount
} from '@vue/test-utils';

import jest from 'jest';
import SingleProject from '@/components/About/SingleProject';

describe('CaseStudies component', () => {
  let wrapper;
  let props = {
    project: {
      projectName: 'nambafood',
      logoImg: 'nambafoodColored',
      contributionWidgetColors: ['#ec1c24', '#96969c'],
      projectBackground: 'nambafoodBackground',
      projectColor: '#f8f7f6',
      projectTitle: 'Contactless delivery service',
      projectDescription: 'Mad Devs created the Namba Food delivery service from scratch. The apps for couriers, end users placing orders and business owners work as a seamless system, ensuring a smooth delivery process for food and other goods.'
    }
  };

  beforeEach(() => {
    wrapper = mount(SingleProject, {
      propsData: props
    });
  });

  test('is Vue\'s instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('.single-project__container shoud contain single-project__container_white-letters-theme class if isWhiteColored computed value will be true', () => {
    props = {
      project: {
        ...props.project,
        projectName: 'teacherly'
      }
    };

    wrapper = mount(SingleProject, {
      propsData: props
    });

    const container = wrapper.findAll('.single-project__container').at(0);
    expect(container.classes()).toContain('single-project__container_white-letters-theme');

    props = {
      project: {
        ...props.project,
        projectName: 'guardrails'
      }
    };

    wrapper = mount(SingleProject, {
      propsData: props
    });
  });

  test('.single-project__container shoud not contain single-project__container_white-letters-theme class if isWhiteColored computed value will be false', () => {
    props = {
      project: {
        ...props.project,
        projectName: 'nambafood'
      }
    };

    wrapper = mount(SingleProject, {
      propsData: props
    });
    
    const container = wrapper.findAll('.single-project__container').at(0);
    expect(container.classes()).not.toContain('single-project__container_white-letters-theme');
  });

  test('shoud pass correct props', () => {
    expect(wrapper.props().project).toStrictEqual(props.project);
  });

  test('shoud add single-project__background_first-project class to .single-project__background if projectName will be nambafood', () => {
    props = {
      project: {
        ...props.project,
        projectName: 'nambafood'
      }
    };

    wrapper = mount(SingleProject, {
      propsData: props
    });
    const background = wrapper.findAll('.single-project__background').at(0);
    expect(background.classes()).toContain('single-project__background_first-project');
  });

  test('shoud add single-project__background_guardrails class to .single-project__background if projectName will be guardrails', () => {
    props = {
      project: {
        ...props.project,
        projectName: 'guardrails'
      }
    };

    wrapper = mount(SingleProject, {
      propsData: props
    });
    const background = wrapper.findAll('.single-project__background').at(0);
    expect(background.classes()).toContain('single-project__background_guardrails');
  });

  test('shoud add single-project__background_godee class to .single-project__background if projectName will be godee', () => {
    props = {
      project: {
        ...props.project,
        projectName: 'godee'
      }
    };

    wrapper = mount(SingleProject, {
      propsData: props
    });
    const background = wrapper.findAll('.single-project__background').at(0);
    expect(background.classes()).toContain('single-project__background_godee');
  });

  test('shoud not add single-project__background_first-project class to .single-project__background if projectName will be nambafood', () => {
    props = {
      project: {
        ...props.project,
        projectName: 'guardrails'
      }
    };

    wrapper = mount(SingleProject, {
      propsData: props
    });

    const background = wrapper.findAll('.single-project__background').at(0);
    expect(background.classes()).not.toContain('single-project__background_first-project');
  });
});
