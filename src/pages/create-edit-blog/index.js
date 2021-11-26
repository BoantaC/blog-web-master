import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { TITLE_MAIN_MENU_ICON } from '../../constants/icon';
import { ADMIN_MENU } from '../../constants/menu-options';
import { blogPostService } from '../../services/blog-post-service';

import { validateText } from '../../helpers/validators';
import Button from '../../components/button';
import Field from '../../components/field';
import AdminHeader from '../../components/admin-header-app';

import MenuComponent from '../../components/generic-menu';

import './style.scss';

export const CreateEditBlog = () => {
  const history = useHistory();

  const [titleInputValue, setTitleInputValue] = useState('');
  const [postContentValue, setPostContentValue] = useState('');

  const [showErrorInput, setShowErrorInput] = useState(false);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(anyOfFieldsHasError);
  }, [postContentValue, titleInputValue]);

  const anyOfFieldsHasError = () => {
    return !validateText(postContentValue) || !validateText(titleInputValue);
  };

  const onCancel = () => {
    history.push('/admin');
  };

  const onChangeTitleHandler = (event) => {
    setTitleInputValue(event.target.value);
    setShowErrorInput(false);
  };

  const onChangeCreateEditBlogHandler = (event) => {
    setPostContentValue(event.target.value);
    setShowErrorInput(false);
  };

  const onSave = () => {
    blogPostService
      .createBlog(postContentValue, titleInputValue)
      .then((result) => {
        if (result?.success) {
          history.push('/admin');
        } else {
          setShowErrorInput(true);
        }
      })
      .catch(() => {
        setShowErrorInput(true);
      });
  };

  return (
    <div className="blog-post-page">
      <AdminHeader text="Create Blog" icon={TITLE_MAIN_MENU_ICON} />
      <div className="blog-post">
        <MenuComponent menuClass="admin-menu" options={ADMIN_MENU} />
        <div className="x">
          <div className="title-input-container">
            <Field
              label="Insert title blog here"
              value={titleInputValue}
              onChange={onChangeTitleHandler}
              type="text"
              errorMessage="Title is not valid"
              validationFunction={validateText}
              isTextArea
              textAreaRows={5}
              textAreaCols={30}
            />
          </div>

          <div className="content-input">
            <Field
              label="Insert blog post here"
              value={postContentValue}
              onChange={onChangeCreateEditBlogHandler}
              type="text"
              errorMessage="Blog post is not valid"
              validationFunction={validateText}
              isTextArea
              textAreaRows={15}
              textAreaCols={60}
            />
            <div className="form-container__login-error">
              {showErrorInput && 'Invalid input'}
            </div>
            <div className="button-container">
              <Button
                text="Save"
                primary
                classes="margin-left"
                disabled={hasError}
                onClick={onSave}
              />
              <Button text="Cancel" primary onClick={onCancel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditBlog;
