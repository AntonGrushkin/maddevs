<template>
  <ModalContainer :name="modalName" successModalID="contact-me-modal">
    <ValidationObserver v-slot="{ invalid }">
      <div class="form"> 
        <div class="fields-list">
          <ValidationProvider class="modal-field-item field-item" rules="required|max:50" v-slot="{ classes, errors }">
            <p class="modal-field-name field-name required">Full Name</p>
            <input type="text" class="modal-entry-field entry-field" :class="classes" placeholder="John Smith" v-model="fullName">
            <div class="modal-error-text error-text">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider class="modal-field-item field-item" rules="max:300" v-slot="{ classes, errors }">
            <p class="modal-field-name field-name">Company</p>
            <input type="text" class="modal-entry-field entry-field" :class="classes" placeholder="MyAwesomeCompany, Inc." v-model="company">
            <div class="modal-error-text error-text">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider class="modal-field-item field-item" rules="email|required" v-slot="{ classes, errors }">
            <p class="modal-field-name field-name required">Work email</p>
            <input type="text" class="modal-entry-field entry-field" :class="classes" placeholder="your@mail.com" v-model="email">
            <div class="modal-error-text error-text">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider class="modal-field-item field-item" rules="phone|max:50" v-slot="{ classes, errors }">
            <p class="modal-field-name field-name">Phone number</p>
            <input type="text" class="modal-entry-field entry-field" :class="classes" placeholder="+1 23X XXX-XXXX" v-model="phoneNumber">
            <div class="modal-error-text error-text">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <FormCheckboxes
          ref="checkboxes"
          v-on:getPrivacyCheckboxState="getPrivacyCheckboxState"
          v-on:getDiscountOffersCheckboxState="getDiscountOffersCheckboxState"
          :inputId="inputId"
        />
        <UIButton
          class="modal-button"
          :disabled="invalid || !agreeWithPrivacyPolicy || onSubmit"
          @click="sendForm(!invalid || agreeWithPrivacyPolicy)"
          :loading="onSubmit"
        >
          Сontact Me
        </UIButton>
      </div>
    </ValidationObserver>
  </ModalContainer>
</template>

<script>
import FormCheckboxes from '@/components/ui/form-checkboxes';
import UIButton from '@/components/ui/UIButton';
import ModalContainer from '@/containers/ModalContainer';

export default {
  name: 'ContactMe',
  components: {
    FormCheckboxes,
    ModalContainer,
    UIButton
  },
  data: () => ({
    modalName: 'contact-me-modal',
    fullName: null,
    email: null,
    emailTo: 'team@maddevs.io',
    phoneNumber: null,
    company: null,
    agreeWithPrivacyPolicy: false,
    agreeToGetMadDevsDiscountOffers: false,
    inputId: 'contact-me',
    onSubmit: false,
    subject: 'Marketing',
    form: null,
    modalTitle: 'Mad Devs Website Forms'
  }),
  mounted() {
    this.$nuxt.$on('resetCheckboxesInForm', () => { // Reset checkboxes in form if user close modal 
      this.agreeWithPrivacyPolicy = false;
      this.agreeToGetMadDevsDiscountOffers = false;
    });
  },
  methods: {
    getPrivacyCheckboxState(privacyState) {
      this.agreeWithPrivacyPolicy = privacyState;
    },
    getDiscountOffersCheckboxState(discountOffersState) {
      this.agreeToGetMadDevsDiscountOffers = discountOffersState;
    },
    createLead() {
      const data = [{
        name: this.fullName,
        custom_fields_values: [
          { field_id: 261281, values: [{ value: this.email }] }, // Email
          { field_id: 261331, values: [{ value: this.company }] }, // Company
          { field_id: 261333, values: [{ value: this.phoneNumber }] } // Phone
        ]
      }];
      this.$store.dispatch('createNewLead', data);
    },
    sendForm(isValid) {
      if (isValid === true && !this.onSubmit) {
        this.onSubmit = true;
        this.form = {
          templateId: 303792, // Required
          variables: {
            fullName: this.fullName || '',
            company: this.company || '',
            email: this.email || '',
            emailTo: this.emailTo || '',
            phoneNumber: this.phoneNumber || '',
            agreeWithPrivacyPolicy: this.agreeWithPrivacyPolicy ? 'Yes' : 'No',
            agreeToGetMadDevsDiscountOffers: this.agreeToGetMadDevsDiscountOffers ? 'Yes' : 'No',
            subject: this.subject || '',
            modalTitle: this.modalTitle
          }
        };
        this.$store.dispatch('sendEmail', this.form).then(res => {
          this.onSubmit = false;
          // this.createLead();
          this.resetForm();
          if (res.status === 200) {
            this.$nuxt.$emit(this.modalName, true);
          } else {
            this.$nuxt.$emit(this.modalName, false);
          }
        });
      }
    },
    resetForm() {
      this.$refs.checkboxes.reset();
      this.fullName = null;
      this.email = null;
      this.phoneNumber = null;
      this.company = null;
      this.agreeWithPrivacyPolicy = false;
      this.agreeToGetMadDevsDiscountOffers = false;
    }
  }
};
</script>
