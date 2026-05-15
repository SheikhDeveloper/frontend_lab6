<template>
  <div class="lab13">
    <h1>Lab 13: VeeValidate Registration Form</h1>
    <p>Implement a registration form with real-time validation feedback using VeeValidate.</p>

    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="registration-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            :class="{ 'valid': emailMeta.valid && emailMeta.dirty, 'invalid': emailError && emailMeta.dirty }"
            @blur="emailMeta.touched = true"
          />
          <div class="field-feedback">
            <span v-if="emailError && emailMeta.dirty" class="error">{{ emailError }}</span>
            <span v-else-if="emailMeta.valid && emailMeta.dirty" class="success">Email is valid</span>
            <span v-else class="hint">Enter a valid email address</span>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Create a strong password"
            :class="{ 'valid': passwordMeta.valid && passwordMeta.dirty, 'invalid': passwordError && passwordMeta.dirty }"
            @blur="passwordMeta.touched = true"
          />
          <div class="field-feedback">
            <span v-if="passwordError && passwordMeta.dirty" class="error">{{ passwordError }}</span>
            <span v-else-if="passwordMeta.valid && passwordMeta.dirty" class="success">Password meets all criteria</span>
            <span v-else class="hint">Password must meet all criteria below</span>
          </div>
        </div>

        <div class="password-criteria">
          <h3>Password Requirements</h3>
          <ul>
            <li v-for="criterion in criteria" :key="criterion.key" :class="{ 'met': criterion.met, 'unmet': !criterion.met }">
              <span class="criterion-icon">{{ criterion.met ? '✓' : '✗' }}</span>
              {{ criterion.text }}
            </li>
          </ul>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="agreed" />
            <span>I agree with the license agreement</span>
          </label>
          <div v-if="!agreed && attemptedSubmit" class="error">You must agree to the license agreement</div>
        </div>

        <button
          type="submit"
          class="submit-btn"
          :disabled="!formValid"
          :class="{ 'disabled': !formValid }"
        >
          Register
        </button>

        <div v-if="submitted" class="success-message">
          Registration submitted successfully! (Demo only)
        </div>
      </form>

      <div class="validation-state">
        <h3>Validation State</h3>
        <div class="state-grid">
          <div class="state-item">
            <span class="state-label">Email Valid:</span>
            <span :class="emailValid ? 'state-valid' : 'state-invalid'">{{ emailValid ? 'Yes' : 'No' }}</span>
          </div>
          <div class="state-item">
            <span class="state-label">Password Valid:</span>
            <span :class="passwordValid ? 'state-valid' : 'state-invalid'">{{ passwordValid ? 'Yes' : 'No' }}</span>
          </div>
          <div class="state-item">
            <span class="state-label">Agreement Checked:</span>
            <span :class="agreed ? 'state-valid' : 'state-invalid'">{{ agreed ? 'Yes' : 'No' }}</span>
          </div>
          <div class="state-item">
            <span class="state-label">Form Valid:</span>
            <span :class="formValid ? 'state-valid' : 'state-invalid'">{{ formValid ? 'Yes' : 'No' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const validationSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
})

const { handleSubmit: veeHandleSubmit, meta: formMeta, errors, validate } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const { value: email, meta: emailMeta, errorMessage: emailError } = useField('email')
const { value: password, meta: passwordMeta, errorMessage: passwordError } = useField('password')

const agreed = ref(false)
const attemptedSubmit = ref(false)
const submitted = ref(false)

const emailValid = computed(() => emailMeta.valid && emailMeta.dirty)
const passwordValid = computed(() => passwordMeta.valid && passwordMeta.dirty)

const formValid = computed(() => {
  return emailMeta.valid && passwordMeta.valid && agreed.value
})

const criteria = computed(() => [
  { key: 'length', text: 'At least 8 characters', met: password.value.length >= 8 },
  { key: 'digit', text: 'Contains at least one digit', met: /\d/.test(password.value) },
  { key: 'lower', text: 'Contains at least one lowercase letter', met: /[a-z]/.test(password.value) },
  { key: 'upper', text: 'Contains at least one uppercase letter', met: /[A-Z]/.test(password.value) },
  { key: 'special', text: 'Contains at least one special character', met: /[^A-Za-z0-9]/.test(password.value) }
])

const onSubmit = veeHandleSubmit(() => {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
  }, 3000)
})

const handleSubmit = () => {
  attemptedSubmit.value = true
  validate().then(({ valid }) => {
    if (valid && agreed.value) {
      onSubmit()
    }
  })
}
</script>

<style scoped>
.lab13 {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }
}

.registration-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

input.valid {
  border-color: #2ecc71;
}

input.invalid {
  border-color: #e74c3c;
}

.field-feedback {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  min-height: 1.25rem;
}

.hint {
  color: #95a5a6;
}

.error {
  color: #e74c3c;
}

.success {
  color: #2ecc71;
}

.password-criteria {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.password-criteria h3 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.password-criteria ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.password-criteria li {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.password-criteria li:last-child {
  border-bottom: none;
}

.criterion-icon {
  display: inline-block;
  width: 1.5rem;
  font-weight: bold;
}

.met {
  color: #2ecc71;
}

.unmet {
  color: #e74c3c;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input {
  margin-right: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.submit-btn:hover:not(.disabled) {
  background: #2980b9;
}

.submit-btn:active:not(.disabled) {
  transform: translateY(1px);
}

.submit-btn.disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.success-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
  text-align: center;
}

.validation-state {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.validation-state h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.state-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.state-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.state-label {
  font-weight: 500;
  color: #34495e;
}

.state-valid {
  color: #2ecc71;
  font-weight: 600;
}

.state-invalid {
  color: #e74c3c;
  font-weight: 600;
}
</style>