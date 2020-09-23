import React from 'react';
import { Grid, Header, List, Divider, Icon } from 'semantic-ui-react';
import css from './Footer.module.css';
import { toast } from 'react-toastify';

export const Footer = () => {
  return (
    <div className={css.footer_container}>
      {/* <Responsive minWidth={767}> */}
        <Grid stackable columns={5}>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
              <h1 className={css.footer_heading}>About</h1>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati</p>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'>
              <h1 className={css.footer_heading}>Follow Us</h1>
              <List horizontal inverted size='huge'>
                <List.Item>
                  <List.Content verticalAlign='top'>
                    <List.Header>
                      <Icon name='facebook' link size='big'
                        onClick={() => toast.info(<Header as='h2' textAlign='center'>Comming soon</Header>)} /></List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content verticalAlign='top'>
                    <List.Header><Icon name='instagram' link size='big'
                      onClick={() => toast.info(<Header as='h2' textAlign='center'>Comming soon</Header>)} /></List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content verticalAlign='top'>
                    <List.Header><Icon name='twitter square' link size='big'
                      onClick={() => toast.info(<Header as='h2' textAlign='center'>Comming soon</Header>)} />
                    </List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
              <h1 className={css.footer_heading}>Contact</h1>
              <List inverted>
                <List.Item icon='marker' className={css.list_item} content='Copengaen 1234, Denmark' />
                <List.Item
                  icon={{ name: 'call', rotated: 'clockwise'}}                  
                  content={<a href='tel:+4520556191'>
                    <span className={css.list_item}>+4520556191</span>
                  </a>}
                />
                <List.Item
                  icon='mail'
                  content={<a href='mailto:iamrajpal83@gmail.com'>
                    <span className={css.list_item}>iamrajpal83@gmail.com</span>
                  </a>}
                />
                <List.Item
                  icon='mail'
                  content={<a href='mailto:rajpalbains82@gmail.com'>
                    <span className={css.list_item}>rajpalbains82@gmail.com</span>
                  </a>}
                />
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      {/* </Responsive> */}

      <Grid stackable columns={3}>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Divider inverted />
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
      <Grid stackable columns={3} style={{ marginTop: 0 }}>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <List inverted floated='right' horizontal verticalAlign='top'>
              <List.Item href='#'>
                <span style={{ color: '#ffffff', fontSize: '1.2em', fontFamily: 'bahnschriftRegular', textDecoration: 'none' }}>
                  ABOUT
                </span>
              </List.Item>
              <List.Item href='#'>
                <span style={{ color: '#ffffff', fontSize: '1.2em', fontFamily: 'bahnschriftRegular', textDecoration: 'none' }}>
                  MATCHES
                </span>
              </List.Item>
              <List.Item href='#'>
                <span style={{ color: '#ffffff', fontSize: '1.2em', fontFamily: 'bahnschriftRegular', textDecoration: 'none' }}>
                  HELP
                </span>
              </List.Item>
              <List.Item href='#'>
                <span style={{ color: '#ffffff', fontSize: '1.2em', fontFamily: 'bahnschriftRegular', textDecoration: 'none' }}>
                  FAQ
                </span>
              </List.Item>
              <List.Item href='#'>
                <span style={{ color: '#ffffff', fontSize: '1.2em', fontFamily: 'bahnschriftRegular', textDecoration: 'none' }}>
                  CONTACT
                </span>
              </List.Item>

            </List>

            <List inverted horizontal verticalAlign='top'>
              <List.Item href='#'>
                <span style={{ color: '#ffffff', fontSize: '1.2em', fontFamily: 'bahnschriftRegular', textDecoration: 'none' }}>
                  Copyright<Icon name='copyright outline' style={{ color: '#ffffff' }} />2020
                </span></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    </div>
  )
}
