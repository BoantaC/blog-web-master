import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { TITLE_MAIN_MENU_ICON } from '../../constants/icon';
import { ADMIN_MENU } from '../../constants/menu-options';
import { blogService } from '../../services/blog-service';

import { validateText } from '../../helpers/validators';
import Button from '../../components/button';
import Field from '../../components/field';
import AdminHeader from '../../components/admin-header-app';

import MenuComponent from '../../components/generic-menu';

import './style.scss';

export const CreateEditBlog = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  const [showErrorInput, setShowErrorInput] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // On construct component, set the id from the url
    if (match.params.id) {
      setId(match.params.id);
      fetchBlog(match.params.id);
    }
  }, []);

  useEffect(() => {
    setHasError(anyOfFieldsHasError);
  }, [title, description]);

  const fetchBlog = (blogId) => {
    blogService
      .getBlogById(blogId)
      .then((result) => {
        if (result?.success && blogId === result.data._id) {
          setTitle(result.data.title);
          setDescription(result.data.description);
        } else {
          goToAdminPage();
        }
      })
      .catch(() => {});
  };

  const anyOfFieldsHasError = () => {
    return !validateText(title) || !validateText(description);
  };

  const goToAdminPage = () => {
    history.push('/admin');
  };

  const onChangeTitleHandler = (event) => {
    setTitle(event.target.value);
    setShowErrorInput(false);
  };

  const onChangeDescriptionHandler = (event) => {
    setDescription(event.target.value);
    setShowErrorInput(false);
  };

  const getFormValues = () => {
    return {
      title: title,
      description: description,
    };
  };

  const onSave = () => {
    blogService
      .create(getFormValues())
      .then((result) => {
        if (result?.success) {
          goToAdminPage();
        } else {
          setShowErrorInput(true);
        }
      })
      .catch(() => {
        setShowErrorInput(true);
      });
  };

  const onEdit = () => {
    blogService
      .edit(id, getFormValues())
      .then((result) => {
        if (result?.success && result.data._id === id) {
          goToAdminPage();
        } else {
          setShowErrorInput(true);
          goToAdminPage();
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
              value={title}
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
              value={description}
              onChange={onChangeDescriptionHandler}
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
                text={id ? 'Update' : 'Save'}
                primary
                classes="margin-left"
                disabled={hasError}
                onClick={id ? onEdit : onSave}
              />
              <Button text="Cancel" primary onClick={goToAdminPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditBlog;
