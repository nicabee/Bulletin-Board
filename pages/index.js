import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material"

import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
export default function Home() {
  const [open, setOpen] = React.useState(false)
  const [openEditDialog, setOpenEditDialog] = React.useState(false)
  const [articleList, setArticleList] = React.useState([])
  const [articleItemTitle, setArticleItemTitle] = React.useState("")
  const [articleItemContent, setArticleItemContent] = React.useState("")
  const [editArticleItemTitle, setEditedArticleItemTitle] = React.useState("")
  const [editArticleItemContent, setEditedArticleItemContent] =
    React.useState("")
  const [index, setIndex] = React.useState(-1)

  const openCreate = () => {
    setOpen(true)
  }
  const openEdit = (ndx) => {
    setIndex(ndx)
    setOpenEditDialog(true)
  }
  const handleClose = () => {
    setArticleItemTitle("")
    setArticleItemContent("")
    setOpen(false)
  }
  const handleCloseEdit = () => {
    setEditedArticleItemTitle("")
    setEditedArticleItemContent("")
    setOpenEditDialog(false)
  }
  const addArticle = () => {
    const newArticle = {
      title: articleItemTitle,
      content: articleItemContent,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    if (newArticle.title && newArticle.content) {
      articleList.push(newArticle)
      setArticleList([...articleList])
      setArticleItemTitle("")
      setArticleItemContent("")
      setOpen(false)
    }
  }

  const editArticle = () => {
    articleList[index].title = editArticleItemTitle
    articleList[index].content = editArticleItemContent
    setEditedArticleItemTitle("")
    setEditedArticleItemContent("")
    setOpenEditDialog(false)
  }
  const handleArticleItemTitle = (event) => {
    const { value } = event.target
    setArticleItemTitle(value)
  }
  const handleArticleItemContent = (event) => {
    const { value } = event.target
    setArticleItemContent(value)
  }
  const handleEditedArticleItemTitle = (event) => {
    const { value } = event.target
    setEditedArticleItemTitle(value)
  }
  const handleEditedArticleItemContent = (event) => {
    const { value } = event.target
    setEditedArticleItemContent(value)
  }

  const deleteArticle = (ndx) => {
    console.log(ndx)
    const newArray = articleList
    if (ndx != -1) {
      newArray.splice(ndx, 1)
    }
    setArticleList([...newArray])
  }

  const displayDetails = (ndx) => {
    console.log(ndx)
  }
  return (
    <>
      <Button variant="contained" sx={{ m: 2 }} onClick={openCreate}>
        Create New Article
      </Button>
      <Box sx={{ m: 2 }}>
        <h3>Articles</h3>
        {/* {console.log(articleList)} */}
        {articleList?.map((elem) => (
          <Grid container spacing={2}>
            <Grid item xs={6} key={articleList?.indexOf(elem)}>
              <List>
                <ListItem>
                  {" "}
                  -&nbsp;
                  <ListItemText
                    primary={
                      <Typography
                        onClick={() =>
                          displayDetails(articleList?.indexOf(elem))
                        }
                      >
                        {elem.title}
                      </Typography>
                    }
                  />
                  <ListItemText
                    primary={<Typography>{elem.content}</Typography>}
                  />
                  <ListItemText
                    primary={
                      <Typography>
                        {JSON.stringify(elem.createdAt).replace(/['"]+/g, "")}
                      </Typography>
                    }
                  />
                  &nbsp;
                  <Button
                    variant="contained"
                    onClick={() => openEdit(articleList?.indexOf(elem))}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                  &nbsp;
                  <Button
                    variant="contained"
                    onClick={() => deleteArticle(articleList?.indexOf(elem))}
                  >
                    <ClearIcon fontSize="small" />
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        ))}
      </Box>
      {/* Create Article Screen */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Article</DialogTitle>
        <DialogContent>
          <DialogContentText>Create an Article</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Article Title"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleArticleItemTitle}
            value={articleItemTitle}
          />

          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Article Content"
            type="email"
            fullWidth
            multiline
            rows={3}
            variant="standard"
            onChange={handleArticleItemContent}
            value={articleItemContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addArticle}>Post</Button>
        </DialogActions>
      </Dialog>
      {/* Article Detail Screen */}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Article</DialogTitle>
        <DialogContent>
          <DialogContentText>View</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addArticle}>Post</Button>
        </DialogActions>
      </Dialog> */}
      {/* Edit Article Screen */}
      <Dialog open={openEditDialog} onClose={handleCloseEdit}>
        <DialogTitle>Edit This Article</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit This Article</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Article Title"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleEditedArticleItemTitle}
            value={editArticleItemTitle}
          />

          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Article Content"
            type="email"
            fullWidth
            multiline
            rows={3}
            variant="standard"
            onChange={handleEditedArticleItemContent}
            value={editArticleItemContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={editArticle}>Post</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
