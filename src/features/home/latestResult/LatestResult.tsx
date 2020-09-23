import React, { useState, useEffect } from 'react';
import { Grid, Segment, Header, Responsive, Divider, Icon } from 'semantic-ui-react';
import css from './LatestResult.module.css';
import { toast } from 'react-toastify';
import User from '../../../assets/images/user.png';
import ArrowLeft from '../../../assets/images/arrowleft.png';
import ArrowRight from '../../../assets/images/arrowright.png';
import ThumbsUp from '../../../assets/images/thumbsup.png';
import ThumbsDown from '../../../assets/images/thumbsdown.png';

const result = [
    {
        id: 'a', nameTeamA: 'India', nameTeamB: 'Pakistan', winner: 'Ind', teamAId: 'Ind', teamBId: 'Pak',
        scoreTeamA: 125, wicketOutTeamA: 5, scoreTeamB: 120, overPlayedTeamA: '20.0', wicketOutTeamB: 8, overPlayedTeamB: '20.0'
    },
    {
        id: 'b', nameTeamA: 'India', nameTeamB: 'Pakistan', winner: 'PakB', teamAId: 'IndA', teamBId: 'PakB',
        scoreTeamA: 124, wicketOutTeamA: 9, scoreTeamB: 140, overPlayedTeamA: '19.1', wicketOutTeamB: 8, overPlayedTeamB: '19.2'
    },
    {
        id: 'c', nameTeamA: 'India', nameTeamB: 'Pakistan', winner: 'IndB', teamAId: 'IndB', teamBId: 'PakD',
        scoreTeamA: 120, wicketOutTeamA: 10, scoreTeamB: 118, overPlayedTeamA: '14.0', wicketOutTeamB: 8, overPlayedTeamB: '17.1'
    },
    {
        id: 'd', nameTeamA: 'India', nameTeamB: 'Pakistan', winner: 'PakE', teamAId: 'IndC', teamBId: 'PakE',
        scoreTeamA: 145, wicketOutTeamA: 10, scoreTeamB: 160, overPlayedTeamA: '18.4', wicketOutTeamB: 8, overPlayedTeamB: '18.0'
    }
];

export const LatestResult = () => {
    const [selectedResultId, setSelectedResultId] = useState('');
    const [selectedResult, setSelectedResult] = useState([{ id: '', nameTeamA: '', nameTeamB: '', winner: '', teamAId: '', teamBId: '', scoreTeamA: 0, wicketOutTeamA: 0, scoreTeamB: 0, overPlayedTeamA: '', wicketOutTeamB: 0, overPlayedTeamB: '' }]);
    useEffect(() => {
        const { id } = result[0];
        setSelectedResultId(id)
    }, [])

    useEffect(() => {
        if (selectedResultId !== '') {
            const res = result.filter(r => r.id === selectedResultId);
            setSelectedResult(res);
        }
    }, [selectedResultId])

    const selectHandler = (id: any) => {
        setSelectedResultId(id);
    }
    // const isSmallMobileDevice: MediaQueryList = window.matchMedia("(max-width: 599px)")
    const resultData = result.map(r => {
        const active = r.id === selectedResultId ? css.active : null;
        return <div className={`${css.result_summary} ${active}`} key={r.id} onClick={() => selectHandler(r.id)}>
            <div className={css.result_summary_inner}>
                <img src={User} alt={r.nameTeamA} />
                <span className={`${css.teamName} ${active}`}>{r.teamAId}</span>
            </div>
            <div className={css.result_summary_inner}>
                <span className={`${css.vs} ${active}`}>VS</span>
            </div>
            <div className={css.result_summary_inner}>
                <span className={`${css.teamName} ${active}`}>{r.teamBId}</span>
                <img src={User} alt={r.nameTeamB} />
            </div>
        </div>
    });

    const resultDetail = <div className={css.result_detail_wrapper}>
        <div className={css.result_detail}>
            <div className={css.left_team_result_detail}>
                <div className={css.left_team_result_detail_contents}>
                    <div className={css.left_team_result_detail_logo}>
                        <img src={User} alt='abcd' />
                        <img src={ArrowLeft} alt='abcd1' />
                        <img
                            src={selectedResult[0].winner === selectedResult[0].teamAId
                                ? ThumbsUp
                                : ThumbsDown}
                            alt={selectedResult[0].teamAId} />
                    </div>
                    <Segment textAlign='center' basic padded='very'>
                        <h1 className={css.left_team_name}>{selectedResult[0].nameTeamA.toUpperCase()}</h1>
                        <h3 className={css.left_team_score}>{`${selectedResult[0].scoreTeamA}/${selectedResult[0].wicketOutTeamA}`}<span> ({selectedResult[0].overPlayedTeamA})</span></h3>
                        <h3 className={css.left_team_result}>{selectedResult[0].scoreTeamA > selectedResult[0].scoreTeamB ? 'WIN' : 'LOSS'}</h3>
                    </Segment>
                </div>
            </div>
            <div className={css.right_team_result_detail}>
                <div className={css.right_team_result_detail_contents}>
                    <div className={css.right_team_result_detail_logo}>
                        <img src={User} alt='abcd' />
                        <img src={ArrowRight} alt='abcd1' />
                        <img
                            src={selectedResult[0].winner === selectedResult[0].teamBId
                                ? ThumbsUp
                                : ThumbsDown }
                            alt={selectedResult[0].teamBId} />
                    </div>
                    <Segment textAlign='center' basic padded='very'>
                        <h1 className={css.right_team_name}>{selectedResult[0].nameTeamB.toUpperCase()}</h1>
                        <h3 className={css.right_team_score}>{`${selectedResult[0].scoreTeamB}/${selectedResult[0].wicketOutTeamB}`}<span> ({selectedResult[0].overPlayedTeamB})</span></h3>
                        <h3 className={css.right_team_result}>{selectedResult[0].scoreTeamB > selectedResult[0].scoreTeamA ? 'WIN' : 'LOSS'}</h3>
                    </Segment>
                </div>
            </div>
        </div>
    </div>;

    return (
        <div className={css.latest_result_container}>
            <div className={css.horizontal}>
                <Divider horizontal>
                    <Header as='h1'>
                        <Icon name='rss' />
                        LATEST RESULT
                    </Header>
                </Divider>
            </div>
            <Responsive minWidth={1200}>
                <Grid columns={4}>
                    <Grid.Row stretched>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={8}>
                            {resultDetail}
                        </Grid.Column>
                        <Grid.Column width={5}>
                            {resultData}
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row stretched>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as='h1' textAlign='center'>Just mock data to display</Header>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <div className={css.view_all_button_container} onClick={() => toast.info(<Header as='h2' textAlign='center'>Comming soon</Header>)}>
                                VIEW ALL
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Responsive>
            <Responsive minWidth={1000} maxWidth={1199}>
                <Grid columns={3}>
                    <Grid.Row stretched>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12}>
                            {resultDetail}
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={10} verticalAlign='middle'>
                            <Header as='h1' textAlign='center'>Just mock data to display</Header>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12}>
                            {resultData}
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column width={5}></Grid.Column>
                        <Grid.Column width={6}>
                            <div className={css.view_all_button_container} onClick={() => toast.info(<Header as='h2' textAlign='center'>Comming soon</Header>)}>
                                VIEW ALL
                            </div>
                        </Grid.Column>
                        <Grid.Column width={5}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Responsive>
            <Responsive minWidth={400} maxWidth={999}>
                <Grid columns={3}>
                    <Grid.Row stretched>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={14}>
                            {resultDetail}
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        {/* <Grid.Column width={1}></Grid.Column> */}
                        <Grid.Column width={16}>
                            <Header as='h1' textAlign='center'>Just mock data to display</Header>
                        </Grid.Column>
                        {/* <Grid.Column width={1}></Grid.Column> */}
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={14}>
                            {resultData}
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column width={5}></Grid.Column>
                        <Grid.Column width={6}>
                            <div className={css.view_all_button_container} onClick={() => toast.info(<Header as='h2' textAlign='center'>Comming soon</Header>)}>
                                VIEW ALL
                            </div>
                        </Grid.Column>
                        <Grid.Column width={5}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Responsive>
            {/* <Responsive minWidth={400} maxWidth={599}>
                <Grid>
                    <Grid.Column width={16}>
                        {resultDetail}
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>Just mock data to display</Header>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {resultData}
                    </Grid.Column>
                    <Grid.Column width={16} textAlign='center'>
                        <div className={css.view_all_button_container}>
                            VIEW ALL
                            </div>
                    </Grid.Column>
                </Grid>
            </Responsive> */}
        </div >
    )
}

