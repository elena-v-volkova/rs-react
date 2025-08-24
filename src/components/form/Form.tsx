import { useRef } from 'react';
// import { useStore } from 'zustand';

export default function Form() {
  function submit() {
    // useStore((state) => state.setNewData(data));
    console.log('');
  }

  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const pass1Ref = useRef<HTMLInputElement | null>(null);
  const pass2Ref = useRef<HTMLInputElement | null>(null);
  const genderMaleRef = useRef<HTMLInputElement | null>(null);
  const genderFemaleRef = useRef<HTMLInputElement | null>(null);
  const agreementRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <form action={submit}>
      <div>
        <label htmlFor="age">age</label>
        <input ref={ageRef} name="age" />
      </div>
      <div>
        <label htmlFor="name">name</label>
        <input ref={nameRef} name="name" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} name="email" />
      </div>

      <div>
        <label htmlFor="passwords">passwords</label>
        <input ref={pass1Ref} name="passwords" />
      </div>

      <div>
        <label htmlFor="passwords2">passwords2</label>
        <input ref={pass2Ref} name="passwords2" />
      </div>

      <div>
        <label htmlFor="gender">gender</label>
        <div>
          <label htmlFor="male">male</label>
          <input ref={genderMaleRef} name="gender" value="male" type="radio" />
        </div>
        <div>
          <label htmlFor="female">female</label>
          <input
            ref={genderFemaleRef}
            name="gender"
            value="female"
            type="radio"
          />
        </div>
      </div>

      <div>
        <label htmlFor="accept">accept</label>
        <input ref={agreementRef} name="accept" />
      </div>

      <div>
        <label htmlFor="upload">upload</label>
        <input ref={fileRef} name="upload" />
      </div>

      <div>
        <label htmlFor="country">country</label>
        <input ref={countryRef} name="country" />
      </div>

      <div>
        <label htmlFor="file">file</label>
        <input ref={fileRef} name="file" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
