import React from 'react';
import OfferEditorForm from "../components/OfferEditorForm";
import ContainerRow from "../components/ContainerRow";

function OfferEditor() {
  return (
    <div className="editor-page">
      <ContainerRow type="page">
        <div className="col-md-10 offset-md-1 col-xs-12">
          <OfferEditorForm />
        </div>
      </ContainerRow>
    </div>
  );
}

export default OfferEditor;
