"use client";


import type React from "react";
import { useState } from "react";
import { EmailInput } from "@/shared/blocks/Form/Email";
import { FormProvider } from "@/shared/blocks/Form/providers";
import { Width } from "@/shared/blocks/Form/Width";
import { InputField } from "@/shared/components/InputField";
import { Text } from "@/shared/components/Text";
import { Button } from "@/shared/components/ui/button";

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[];
}

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form?: any;
  introContent?: string;
  width: number;
  submitButtonLabel: string;
};

export const FormBlock: React.FC<
  {
    id?: string;
  } & FormBlockType
> = (props) => {
  const { enableIntro, introContent, submitButtonLabel } = props;

  const [hasSubmitted, setHasSubmitted] = useState(false);
  // const {
  //   enableIntro,
  //   form: formFromProps,
  //   form: {
  //     id: formID,
  //     confirmationMessage,
  //     confirmationType,
  //     redirect,
  //     submitButtonLabel,
  //   } = {},
  //   introContent,
  //   width,
  // } = props;

  // const formMethods = useForm({
  //   defaultValues: buildInitialFormState(formFromProps.fields),
  // });

  // const {
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  //   register,
  // } = formMethods;

  // const [isLoading, setIsLoading] = useState(false);

  // const [hasSubmitted, setHasSubmitted] = useState<boolean>();

  // const [error, setError] = useState<
  //   { message: string; status?: string } | undefined
  // >();

  // const router = useRouter();

  // const onSubmit = useCallback(
  //   (data: Data) => {
  //     let loadingTimerID: ReturnType<typeof setTimeout>;
  //     const submitForm = async () => {
  //       setError(undefined);

  //       const dataToSend = Object.entries(data).map(([name, value]) => ({
  //         field: name,
  //         value,
  //       }));

  //       // delay loading indicator by 1s
  //       loadingTimerID = setTimeout(() => {
  //         setIsLoading(true);
  //       }, 1000);

  //       try {
  //         const req = await fetch(
  //           `${getClientSideURL()}/api/form-submissions`,
  //           {
  //             body: JSON.stringify({
  //               form: formID,
  //               submissionData: dataToSend,
  //             }),
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             method: "POST",
  //           },
  //         );

  //         const res = await req.json();

  //         clearTimeout(loadingTimerID);

  //         if (req.status >= 400) {
  //           setIsLoading(false);

  //           setError({
  //             message: res.errors?.[0]?.message || "Internal Server Error",
  //             status: res.status,
  //           });

  //           return;
  //         }

  //         setIsLoading(false);
  //         setHasSubmitted(true);

  //         if (confirmationType === "redirect" && redirect) {
  //           const { url } = redirect;

  //           const redirectUrl = url;

  //           if (redirectUrl) router.push(redirectUrl);
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //         setIsLoading(false);
  //         setError({
  //           message: "Something went wrong.",
  //         });
  //       }
  //     };

  //     void submitForm();
  //   },
  //   [router, formID, redirect, confirmationType],
  // );
  const handleSubmit = (form: any) => {};

  const formID = "hello";

  return (
    <section className="mx-auto w-fit xl:min-w-2xl max-w-full h-[70vh] xl:h-screen flex justify-center flex-col items-center">
      {enableIntro && introContent && !hasSubmitted && (
        <Text
          variant={"secondary"}
          font="sans"
          comp={"p"}
          size={"xs"}
          className="mb-6 md:mb-8 lg:mb-12 font-semibold text-center fl-text-36/80 leading-tight"
        >
          {introContent}
        </Text>
      )}
      <div className="w-full">
        <FormProvider>
          {/* {!isLoading && hasSubmitted && confirmationType === "message" && (
            <Text comp="p" size={"xs"}>{confirmationMessage}</Text>
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && (
            <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
          )} */}

          {!hasSubmitted && (
            <form
              id={formID}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-3 gap-3 xl:gap-4 fl-px-16/32 fl-py-16/32 items-center bg-secondary rounded-2xl md:rounded-3xl 2xl:rounded-4xl"
            >
              <div className="w-full last:mb-0 grow col-span-2">
                <EmailInput
                  label={""}
                  name={"email"}
                  className="base-2/3"
                  errors={undefined}
                  register={undefined}
                />
                {/* {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    //  FormFieldBlock
                    // const Field = field.blockType === 'checkbox' && fields[field.blockType]

                    const Field = fields[
                      field.blockType as keyof typeof fields
                    ] as any;
                    if (Field) {
                      return (
                        <div
                          className="mb-3 last:mb-0 base-2/3 w-full"
                          key={String(index)}
                        >
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      );
                    }
                    return null;
                  })} */}
              </div>

              <Button
                // aria-label="Заказать обратный звонок"
                // disabled={!checked}
                form={formID}
                type="submit"
                size={"lg"}
                variant={"default"}
                className={
                  "fsNormal2 text-white! w-full grid-cols-1 lg:col-span-1 rounded-3xl uppercase"
                }
              >
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </section>
  );
};
