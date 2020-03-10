import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Menu from "../../components/Menu";

const contract_options = [
  { label: "Contrato Padrão" },
  { label: "Contrato para Kits Hidráulicos" },
  { label: "Contrato para Monofio" }
];

const renderSelect = ({ input, label, options }) => (
  <div>
    <FormControl required fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect native required {...input}>
        <option value="" />
        {options.map(option => (
          <option value={option.label}>{option.label}</option>
        ))}
      </NativeSelect>
    </FormControl>
  </div>
);

function ContractOptions({ formValues, history, handleSubmit, submitting }) {
  async function showResults() {
    if (formValues.tipo_contrato === "Contrato Padrão") {
      history.push(`/paymentdetails`);
    } else {
      history.push(`/contractdetails`);
    }
  }

  return (
    <div>
      <Menu title="Tipo de Contrato" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="tipo_contrato"
              options={contract_options}
              label="Selecione o tipo de contrato"
              type="text"
              component={renderSelect}
            />
          </Container>
          <Link to="/productdetails">
            <Button variant="contained" style={{ margin: 15 }}>
              Voltar
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: 15 }}
            disabled={submitting}
          >
            Continuar
          </Button>
        </form>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  formValues: getFormValues("infoReduxForm")(state)
});

ContractOptions = connect(mapStateToProps, mapDispatchToProps)(ContractOptions);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ContractOptions);
