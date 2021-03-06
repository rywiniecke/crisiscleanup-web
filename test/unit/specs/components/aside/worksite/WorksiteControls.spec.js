import {shallow} from '@vue/test-utils';
import WorksiteControls from '@/components/aside/worksite/WorksiteControls';
import sinon from "sinon";
import {mockStore} from 'vuenit';
import i18n from '@/services/i18n';

describe('WorksiteControls.vue', () => {
  let getters;
  let $store;

  beforeEach(() => {
    getters = {
      isCurrentSiteClaimed: true,
      isCurrentSiteClaimedByUserOrg: true,
      getWorksiteViews: false
    };

    $store = { getters: getters }
  });

  describe('basics', function () {
    let wrapper;

    it('can render', () => {
      const wrapper = shallow(WorksiteControls, { i18n, mocks: { $store } });
      let allButtons = wrapper.findAll('button');
      expect(allButtons.length).to.equal(3);
    });

  });

  describe('Button action interactions', () => {
    let wrapper;
    const btnStub = sinon.stub();

    beforeEach(() => {});

    it('should clear form for new site when New btn is clicked', () => {
      const storeCommitStub = sinon.stub();

      $store = { getters: getters, commit: storeCommitStub }
      wrapper = shallow(WorksiteControls, {i18n, mocks: {$store}});

      wrapper.findAll('button').at(0).trigger('click');
      expect(storeCommitStub.called).to.be.true
    });

    /*
    it('should allow user to contact org', () => {
      wrapper.setMethods({contactOrg: btnStub});
      wrapper.find('#').at(3).trigger('click');
      expect(btnStub.called).to.be.true
    });

    it('should allow user to print form', () => {
      wrapper.setMethods({firePrintBtn: btnStub});
      wrapper.find('#printBtn').trigger('click');
      expect(btnStub.called).to.be.true
    });

    */

  });

  describe('Claim visibility', () => {
    let wrapper;

    it('should NOT show claim if already claimed by another org', () => {
      getters.isCurrentSiteClaimed = true;
      getters.isCurrentSiteClaimedByUserOrg = false;
      $store = { getters: getters }
      wrapper = shallow(WorksiteControls, {i18n, mocks: { $store }});
      const btn = wrapper.find('#ccu-claim-btn');
      expect(btn.element.style.display).to.equal('none');
    });

    it('should show claim if site is not claimed by any org', () => {
      getters.isCurrentSiteClaimedByUserOrg = false;
      getters.isCurrentSiteClaimed = false;
      $store = { getters: getters }
      wrapper = shallow(WorksiteControls, {i18n, mocks: {$store}});
      const btn = wrapper.find('#ccu-claim-btn');
      expect(btn.element.style.display).to.equal('');
      expect(btn.text()).to.include('Claim')
    });

    it('should show unclaim if site is claimed by user org', () => {
      getters.isCurrentSiteClaimedByUserOrg = true;
      getters.isCurrentSiteClaimed = true;
      $store = { getters: getters }
      wrapper = shallow(WorksiteControls, {i18n, mocks: {$store}});
      const btn = wrapper.find('#ccu-claim-btn');
      expect(btn.element.style.display).to.equal('');
      expect(btn.text()).to.include('Unclaim')
    })

  });

});
