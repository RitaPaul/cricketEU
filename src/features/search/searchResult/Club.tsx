import React, { useContext } from 'react';
import {
    Grid,
    Reveal,
    Label,
    Icon,
} from 'semantic-ui-react';
import { IClubProfiles } from '../../../app/models/clubProfile';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../user/LoginForm';
import { observer } from 'mobx-react-lite';
import css from './Club.module.css';
import './Club.css';
import { AppButton, } from '../../../app/common/button/AppButton';
import User from '../../../assets/images/user.png';


const Club: React.FC<{ clubProfile: IClubProfiles }> = ({ clubProfile }) => {
    const rootStore = useContext(RootStoreContext);
    const {
        loading,
        newClubMember,
        deleteClubMember,
        followClub,
        unFollowClub,
        getId
    } = rootStore.searchStore;
    const token = window.localStorage.getItem('jwt');
    const { isLoggedIn, user } = rootStore.userStore;

    const { openModal } = rootStore.modalStore;

    const generateId = (pre: string, id: string) => {
        return pre.concat('_', id);
    }

    return (
        <div className={css.result_container_inner}>
            <div className={css.item_container}>
                {clubProfile.clubAdmin && <Label                    
                    // className={`${css.adminlabel}`}
                    ribbon='right'
                    // style={{
                    //     backgroundColor: '#E0BA6A',
                    //     color: '#FFFFFF',
                    //     position: 'absolute',
                    //     height: '40px',
                    //     fontFamily: 'robotoMedium',
                    //     fontSize: '1.4em',
                    //     top: '10px',
                    //     fontWeight: 'bold'
                    //     fontWeight: 'bold'
                    // }}
                >
                    ADMIN
                </Label>}
                <Grid className={css.result_item} column={3}>
                    <Grid.Row stretched>
                        <Grid.Column width={10}>
                            <div className={css.item_inner_container_left}>
                                <div className={css.club_image_container}>
                                    <NavLink to={clubProfile.clubAdmin && user && isLoggedIn && token
                                        ? `/user/${user.username}/${clubProfile.id}`
                                        : `/club/${clubProfile.id}`}>
                                        <img className={css.item_img} alt='abcd'
                                            src={clubProfile.clubImage || User} />
                                    </NavLink>
                                </div>
                                <div className={css.club_desc_container}>
                                    <NavLink
                                        to={clubProfile.clubAdmin && user && isLoggedIn && token
                                            ? `/user/${user.username}/${clubProfile.id}`
                                            : `/club/${clubProfile.id}`}>
                                        <h3 className={css.item_displayname}>{clubProfile.displayname.toUpperCase()}</h3>
                                    </NavLink>
                                    <h4 className={css.item_fullname}>{clubProfile.clubname}</h4>
                                        <span className={css.item_description}>{clubProfile.type}</span>
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div className={css.item_inner_container_right}>
                                <span className={css.numbers}>{clubProfile.clubFollowersCount}</span>
                                <span className={css.labeltext}>FOLLOWERS</span>
                                {!clubProfile.clubAdmin &&
                                    <Reveal animated='move'>
                                        <Reveal.Content visible style={{ width: '100%' }}>
                                            <AppButton
                                                buttonType='full'
                                                buttonContent={getId((clubProfile.following ? 'unfollow' : 'follow'), clubProfile.id)
                                                ? <Icon loading name='spinner' /> 
                                                : clubProfile.following ? 'FOLLOWING' : 'FOLLOW'}
                                                contentClass='follow'
                                            />
                                        </Reveal.Content>
                                        <Reveal.Content hidden>
                                            <AppButton
                                                onClick={!user || !isLoggedIn ? () => openModal(<LoginForm />) :
                                                    clubProfile.following
                                                        ? () => unFollowClub(clubProfile.id)
                                                        : () => followClub(clubProfile.id)
                                                }
                                                buttonContent={getId((clubProfile.following ? 'unfollow' : 'follow'), clubProfile.id)
                                                    ? <Icon loading name='spinner' />
                                                    : clubProfile.following ? 'UNFOLLOW' : 'FOLLOW'}
                                                buttonType='border'
                                                contentClass='onfollow'
                                            />
                                        </Reveal.Content>
                                    </Reveal>
                                }
                            </div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div className={css.item_inner_container_right}>
                                <span className={css.numbers}>{clubProfile.clubMembersCount}</span>
                                <span className={css.labeltext}>MEMBERS</span>
                                {!clubProfile.clubAdmin && !clubProfile.member && !clubProfile.approved
                                    ? <Reveal animated='move'>
                                        <Reveal.Content visible style={{ width: '100%' }}>
                                            <AppButton
                                                buttonType='full'
                                                buttonContent={loading && getId('new', clubProfile.id)
                                                ? <Icon loading name='spinner' /> : 'JOIN'}
                                                contentClass='follow'
                                            />
                                        </Reveal.Content>

                                        <Reveal.Content hidden>
                                            <AppButton
                                                buttonType='border'
                                                onClick={!user || !isLoggedIn ? () => openModal(<LoginForm />)
                                                    : () => newClubMember(clubProfile.id)
                                                }
                                                buttonContent={getId('new', clubProfile.id)
                                                    ? <Icon loading name='spinner' /> : 'JOIN'}
                                                contentClass='onfollow'
                                            />

                                        </Reveal.Content>
                                    </Reveal>
                                    : !clubProfile.clubAdmin && clubProfile.member && clubProfile.approved ?
                                        <Reveal animated='move'>
                                            <Reveal.Content visible style={{ width: '100%' }}>
                                                <AppButton
                                                    buttonType='full'
                                                    buttonContent={getId('delete', clubProfile.id)
                                                    ? <Icon loading name='spinner' /> : 'MEMBER'}
                                                    contentClass='follow'
                                                />
                                            </Reveal.Content>
                                            <Reveal.Content hidden>
                                                <AppButton
                                                    buttonType='border'
                                                    onClick={!user || !isLoggedIn ? () => openModal(<LoginForm />) :
                                                        () => deleteClubMember(clubProfile.id)
                                                    }
                                                    buttonContent={getId('delete', clubProfile.id)
                                                        ? <Icon loading name='spinner' /> : 'LEAVE'}
                                                    contentClass='onfollow'
                                                />
                                            </Reveal.Content>
                                        </Reveal> : !clubProfile.clubAdmin && !clubProfile.approved && clubProfile.member &&
                                        <AppButton
                                            buttonType='wait'
                                            buttonContent='REQ. SEND'
                                            contentClass='onwait'
                                        />
                                }
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            {
                !clubProfile.approved && clubProfile.member && !clubProfile.clubAdmin &&
                <div className={css.pending_req_container}>
                    <div className={css.just_for_align}></div>
                    <div className={css.pending_req_container_col}>
                        <span className={css.pending_req_container_span}><Icon name='add user' flipped='horizontally' />
                        Your request is pending</span>
                    </div>
                    <div className={css.pending_req_container_col} id={generateId('cancel', clubProfile.id)}>
                        <span className={css.pending_req_container_span}
                            onClick={() => deleteClubMember(clubProfile.id)}>
                            {getId('delete', clubProfile.id)
                                ? <Icon loading name='spinner' />
                                : <Icon link name='close' />}Cancel request</span>
                    </div>
                </div>

            }
        </div >
    );
}

export default observer(Club);
