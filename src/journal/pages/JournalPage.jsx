import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Aliqua culpa ad non laboris in minim exercitation cillum labore. Dolor
        incididunt anim anim laboris consectetur quis nulla mollit in sint est.
        Magna aliqua ea exercitation cillum dolor commodo culpa ut in.
        Adipisicing id eiusmod magna labore. Consectetur magna ut nisi eiusmod
        ad nulla nulla commodo laboris commodo qui incididunt ut velit. Elit
        deserunt veniam est do ullamco consectetur duis sit excepteur minim
        occaecat. Duis incididunt velit eiusmod incididunt laboris sit laborum
        tempor ad voluptate incididunt.
      </Typography> */}

      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
