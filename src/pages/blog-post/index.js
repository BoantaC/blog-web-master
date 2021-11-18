import React, { useState } from 'react';
import { TITLE_MAIN_MENU_ICON } from '../../constants/icon';
import Field from '../../components/field';

import { validateName } from '../../helpers/validators';
import Button from '../../components/button';
import AdminHeader from '../../components/admin-header-app';

import './style.scss';

export const BlogPost = () => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const [postContentValue, setPostContentValue] = useState('');
  const onChangeTitleHandler = (event) => {
    setTitleInputValue(event.target.value);
  };

  const onChangeBlogPostHandler = (event) => {
    setPostContentValue(event.target.value);
  };
  return (
    <div className="blog-post-page">
      <AdminHeader text="Blog Post" icon={TITLE_MAIN_MENU_ICON} />
      <div className="title-input-container">
        <Field
          label="Insert title blog here"
          value={titleInputValue}
          onChange={onChangeTitleHandler}
          type="text"
          errorMessage="Title is not valid"
          validationFunction={validateName}
          isTextArea
          textAreaRows="5"
          textAreaCols="30"
        />
        <Button text="Action Button" primary />
      </div>

      <div className="content-input">
        <Field
          label="Insert blog post here"
          value={postContentValue}
          onChange={onChangeBlogPostHandler}
          type="text"
          errorMessage="Blog post is not valid"
          validationFunction={validateName}
          isTextArea
          textAreaRows="15"
          textAreaCols="60"
        />
        <Button text="Action Button" primary />
      </div>
    </div>
  );
};

export default BlogPost;
