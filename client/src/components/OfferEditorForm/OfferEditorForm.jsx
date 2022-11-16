import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getOffer from "../../services/getOffer";
import setOffer from "../../services/setOffer";
import FormFieldset from "../FormFieldset";

const emptyForm = { candidate: "", role: "", compensation: "", equity: "", benefits: "", terms: "", tagList: "" };

function OfferEditorForm() {
  const { state } = useLocation();
  const [{ candidate, role, compensation, equity, benefits, terms, tagList }, setForm] = useState(
    state || emptyForm,
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuth, headers, loggedUser } = useAuth();

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const redirect = () => navigate("/", { replace: true, state: null });
    if (!isAuth) return redirect();

    if (state || !slug) return;

    getOffer({ headers, slug })
      .then(({ author: { username }, candidate, role, compensation, equity, benefits, terms, tagList}) => {
        if (username !== loggedUser.username) redirect();

        setForm({ candidate, role, compensation, equity, benefits, terms, tagList});
      })
      .catch(console.error);

    return () => setForm(emptyForm);
  }, [headers, isAuth, loggedUser.username, navigate, slug, state]);

  const inputHandler = (e) => {
    const type = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [type]: value }));
  };

  const tagsInputHandler = (e) => {
    const value = e.target.value;

    setForm((form) => ({ ...form, tagList: value.split(/,| /) }));
  };

  const formSubmit = (e) => {
    e.preventDefault();

    setOffer({ headers, slug, candidate, role, compensation, equity, benefits, terms, tagList })
      .then(() => navigate(`/`))
      .catch(setErrorMessage);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/`)
  }

  return (
    <form onSubmit={formSubmit}>
      <fieldset>
        {errorMessage && <span className="error-messages">{errorMessage}</span>}
        <FormFieldset
          placeholder="Candidate name"
          name="candidate"
          required
          value={candidate}
          handler={inputHandler}
        ></FormFieldset>

        <FormFieldset
          normal
          placeholder="Role title"
          name="role"
          required
          value={role}
          handler={inputHandler}
        ></FormFieldset>

        <FormFieldset
          normal
          placeholder="Base compensation amount"
          name="compensation"
          required
          value={compensation}
          handler={inputHandler}
        ></FormFieldset>

<FormFieldset
          normal
          placeholder="Equity"
          name="equity"
          required
          value={equity}
          handler={inputHandler}
        ></FormFieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows="8"
            placeholder="Company Benefits (in markdown)"
            name="benefits"
            required
            value={benefits}
            onChange={inputHandler}
          ></textarea>
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows="8"
            placeholder="Terms (in markdown)"
            name="terms"
            required
            value={terms}
            onChange={inputHandler}
          ></textarea>
        </fieldset>

        <FormFieldset
          normal
          placeholder="Enter tags"
          name="tags"
          value={tagList}
          handler={tagsInputHandler}
        >
          <div className="tag-list"></div>
        </FormFieldset>

        <button className="btn btn-lg pull-xs-right offerSub" type="submit">
          {slug ? "Update Offer" : "Make Offer"}
        </button>
        
        <button className="btn btn-lg pull-xs-right mr" type="submit" onClick={handleCancel}>
          {slug ? "Cancel" : "Cancel"}
        </button>

      </fieldset>
    </form>
  );
}

export default OfferEditorForm;
