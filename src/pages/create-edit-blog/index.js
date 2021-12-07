import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { blogService } from '../../services/blog-service';
import { BLOG_POSTS_TABLE_HEADERS } from '../admin/table-config';

import AdminHeader from '../../components/header-app';
import MenuComponent from '../../components/generic-menu';
import Button from '../../components/button';
import Field from '../../components/field';

import { validateText } from '../../helpers/validators';

import './style.scss';

export const CreateEditBlog = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
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
      .getById(blogId)
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
    <div className="blog-create-edit-page">
      <AdminHeader text="ADMIN BLOG CREATE / EDIT" />
      <div className="blog-create-edit-page__container">
        <div className="admin-menu">
          <MenuComponent
            menuClass="admin-menu__container"
            menuOptionClass="admin-menu__option"
            iconClass="admin-menu__icon"
            options={BLOG_POSTS_TABLE_HEADERS}
            textClass="admin-menu__text"
          />
        </div>
        <div className="admin-content-container">
          <p className="admin-content-container__title">Create / Edit Blog</p>
          <Field
            fieldClass="admin-content-container__field"
            label="Insert title blog here"
            value={title}
            onChange={onChangeTitleHandler}
            type="text"
            errorMessage="Title is not valid"
            validationFunction={validateText}
            isTextArea
            textAreaRows={5}
            textAreaCols={25}
          />
          <Field
            fieldClass="admin-content-container__field"
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
          <div className="form-container__error">
            {showErrorInput && 'Invalid input'}
          </div>
          <div className="admin-content-container__button-container">
            <Button
              text={id ? 'Update' : 'Save'}
              primary
              classes="admin-content-container__button-container__button"
              disabled={hasError}
              onClick={id ? onEdit : onSave}
            />
            <Button
              classes="admin-content-container__button-container__button"
              text="Cancel"
              primary
              onClick={goToAdminPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditBlog;
