import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import * as Yup from "yup";

export interface Props {
  id: string;
  onSubmit: () => Promise<void>;
}

const QuitForm = ({id, onSubmit}: Props): JSX.Element => {
  const {t} = useTranslation();

  const QuitFormSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("form:id.idRequired"))
      .oneOf([id], `${t("form:id.idMatch")} ${id}`),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(QuitFormSchema),
  });

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              as={
                <TextField
                  autoFocus
                  fullWidth
                  id="quit-id"
                  label={`${t("form:id.pleaseType")} ${id} ${t(
                    "form:id.toQuit",
                  )}`}
                  margin="normal"
                  name="quit"
                  required
                  variant="outlined"
                  error={!!errors.id}
                  inputRef={register}
                  helperText={errors.id ? errors.id.message : ""}
                  type="text"
                />
              }
              name="quit"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("common:common.quit")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="reset"
              fullWidth
              variant="outlined"
              color="primary"
              onClick={(): void => Router.back()}
            >
              {t("common:common.cancel")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default QuitForm;
