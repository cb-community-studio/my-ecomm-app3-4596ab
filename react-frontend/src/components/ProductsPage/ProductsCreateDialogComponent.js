
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ProductsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            name: _entity.name,
            price: _entity.price,
            description: _entity.description,
            color: _entity.color,
            photo: _entity.photo,
            tags: _entity.tags

        };

        setLoading(true);
        try {
            const result = await client.service("products").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="products-create-dialog-component">
                <div>
                    <p className="m-0" >Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Price:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.price} onChange={(e) => setValByKey("price", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Description:</p>
                    <InputText className="w-full mb-3" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Color:</p>
                    <InputText className="w-full mb-3" value={_entity?.color} onChange={(e) => setValByKey("color", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Photo:</p>
                    <InputText className="w-full mb-3" value={_entity?.photo} onChange={(e) => setValByKey("photo", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Tags:</p>
                    <InputText className="w-full mb-3" value={_entity?.tags} onChange={(e) => setValByKey("tags", e.target.value)}  />
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(ProductsCreateDialogComponent);
// createDialog_code.template