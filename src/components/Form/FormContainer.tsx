/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import { ReactNode } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
    width: string;
} & TFormConfig;
function FormContainer({ children, onSubmit, width, resolver, defaultValues }: TFormProps) {
    const formConfig: TFormConfig = {};
    if (resolver) {
        formConfig['resolver'] = resolver
    }
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues
    }
    const methods = useForm(formConfig)
    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data)
    }
    return (
        <FormProvider {...methods}>
            <Form style={{ width: width }} layout="vertical" onFinish={methods.handleSubmit(submit)}>
                {children}
            </Form>
        </FormProvider>
    )
}

export default FormContainer

// type TFormConfig = {
//     resolver: any
// }
// type TConfigProps = {
//     onSubmit: SubmitHandler<FieldValues>;
//     children: ReactNode;
//     width: string;
// } & TFormConfig
// function FromContainer({ onSubmit, children, resolver }: TConfigProps) {

//     const formConfig: TFormConfig = {}
//     if (resolver) {
//         formConfig['resolver'] = resolver
//     }
//     const methods = useForm()
//     const submit = (data) => {
//         onSubmit(data)
//     }
//     return (
//         <FormProvider {...methods}>
//             <Form onFinish={methods.handleSubmit(submit)}>
//                 {children}
//             </Form>
//         </FormProvider>
//     )
// }

// export default FromContainer