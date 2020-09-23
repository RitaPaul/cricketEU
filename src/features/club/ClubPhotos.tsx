import React, { useContext, useState } from 'react';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ClubPhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    clubProfile,
    uploadClubPhoto,
    uploadingPhoto,
    setMainPhoto,
    deletePhoto,
    loadingClubProfile,
    isCurrentUserAndClub
  } = rootStore.clubProfileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  const handleUploadImage = (photo: Blob) => {
    uploadClubPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUserAndClub && (
            <Button
              onClick={() => setAddPhotoMode(!addPhotoMode)}
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploadingPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {clubProfile && clubProfile.clubPhotos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUserAndClub && (
                      <Button.Group fluid widths={2}>
                        <Button
                          onClick={e => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                          name={photo.id}
                          disabled={photo.isMain}
                          loading={loadingClubProfile && target === photo.id}
                          basic
                          positive
                          content='Main'
                        />
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          onClick={(e) => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name)
                          }}
                          loading={loadingClubProfile && deleteTarget === photo.id}
                          basic
                          negative
                          icon='trash'
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ClubPhotos);