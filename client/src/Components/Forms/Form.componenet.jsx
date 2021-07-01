import { TextField, Button, Typography, Paper, Grow } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import {useDispatch} from 'react-redux'
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from 'react-redux'
    

const Form = ({currentId, setCurrentId}) => {
  const classes = useStyles();
  const post = useSelector((state) => currentId ? state.posts.find((post) => post._id===currentId) : null);
  const dispatch = useDispatch()

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentId)
      dispatch(updatePost(currentId, postData))
    else
      dispatch(createPost(postData))

    clear()
  };

  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
    setCurrentId(null)
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={(`${classes.form}`, `${classes.root}`)}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" color="initial">
          {currentId ? 'Updating' : 'Creating'} a memory
        </Typography>
        <TextField
          id="creator"
          label="Creator"
          variant="filled"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          size="small"
        />

        <TextField
          id="title"
          label="Title"
          variant="filled"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          size="small"
        />
        <TextField
          id="message"
          label="Message"
          variant="filled"
          multiline
          rows={4}
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          size="small"
        />
        <TextField
          id="tags"
          label="Tags"
          variant="filled"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          size="small"
        />

        <div className={classes.fileInput}>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
