

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword } from '../Action/userAction';
import { toast } from 'react-toastify';
import { UPDATE_PASSWORD_RESET } from '../constant/userConstant';
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import { Lock, LockOpen, VpnKey } from '@mui/icons-material';
import "./UpdatePassword.css";


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector((state) => state?.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const passwordData = {
            oldPassword,
            newPassword,
            confirmPassword
        };

        console.log(passwordData);
        dispatch(updatePassword(passwordData));
    };


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
            console.log(error);
        }
        if (isUpdated) {
            toast.success("Profile update successful");
            navigate("/profile");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated]);
    // console.log(isUpdate);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Update Profile</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKey />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpen />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <Lock />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdatePassword;