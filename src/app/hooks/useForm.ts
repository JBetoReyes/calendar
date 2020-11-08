import {useState} from 'react';
import {AppFormData} from 'src/typings/hooks';
import {AppChangeEvent, AppSubmitEvent} from 'src/typings/htmlEvents';

export type HookData<T extends AppFormData> = {
  formData: T;
  handleChange: (e: AppChangeEvent) => void;
};

const useForm = <T extends AppFormData>(initialState: T): HookData<T> => {
  const [formData, setFormData] = useState<T>(initialState);
  const handleChange = (e: AppChangeEvent) => {
    const {
      target: {name, value},
    } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return {
    formData,
    handleChange,
  };
};

export default useForm;
