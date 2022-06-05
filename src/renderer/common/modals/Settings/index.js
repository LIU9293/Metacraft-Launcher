import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import Modal from '../../components/Modal'
import CloseButton from '../../components/CloseButton'
import SocialButtons from '../../components/SocialButtons'
import { closeModal } from '../../reducers/modals/actions'

import General from './components/General.js'
import Java from './components/Java'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  text-align: center;

  .ant-slider-mark-text,
  .ant-input,
  .ant-select-selection-search-input,
  .ant-btn {
    -webkit-backface-visibility: hidden;
  }
`
const SideMenu = styled.div`
  flex: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: ${props => props.theme.palette.grey[800]};
  padding-top: calc(${props => props.theme.sizes.height.systemNavbar} + 5px);
`

const SettingsContainer = styled.div`
  flex: 1;
  flex-grow: 3;
`

const SettingsColumn = styled.div`
  margin-left: 50px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const SettingsButton = styled(({ active, ...props }) => <Button {...props} />)`
  align-items: left;
  justify-content: left;
  text-align: left;
  width: 100%;
  height: 30px;
  ${'' /* border-radius: 4px 0 0 4px; */}
  font-size: 12px;
  white-space: nowrap;
  background: ${props =>
    props.active
      ? props.theme.palette.grey[600]
      : props.theme.palette.grey[800]};
  border: 0px;
  text-align: left;
  animation-duration: 0s;
  color: ${props => props.theme.palette.text.primary};
  &:hover {
    color: ${props => props.theme.palette.text.primary};
    background: ${props => props.theme.palette.grey[700]};
  }
  &:focus {
    color: ${props => props.theme.palette.text.primary};
    background: ${props => props.theme.palette.grey[600]};
  }
`

const SettingsTitle = styled.div`
  margin-top: 15px;
  padding-left: 15px;
  text-align: left;
  width: 100%;
  height: 30px;
  font-size: 12px;
  font-weight: 300;
  white-space: nowrap;
  color: ${props => props.theme.palette.grey[50]};
`

const pages = {
  General: {
    name: 'General',
    component: General
  },
  Java: {
    name: 'Java',
    component: Java
  }
}

export default function Settings () {
  const [page, setPage] = useState('General')
  const dispatch = useDispatch()
  const ContentComponent = pages[page].component

  return (
    <Modal
      css={`
        height: 100%;
        width: 100%;
      `}
      header='false'
    >
      <Container>
        <CloseButton
          css={`
            position: absolute;
            top: 30px;
            right: 30px;
          `}
          onClick={() => dispatch(closeModal())}
        />
        <SideMenu>
          <SettingsTitle>General</SettingsTitle>
          {Object.values(pages).map(val => (
            <SettingsButton
              key={val.name}
              active={page === val.name}
              onClick={() => setPage(val.name)}
            >
              {val.name}
            </SettingsButton>
          ))}
          <div
            css={`
              align-items: left;
              justify-content: left;
              text-align: left;
              width: 200px;
              position: absolute;
              bottom: 0;
              margin-bottom: 30px;
            `}
          >
            <div
              css={`
                margin-top: 20px;
              `}
            >
              <SocialButtons />
            </div>
            {/* <div
              css={`
                margin-top: 20px;
                display: flex;
                font-size: 10px;
                flex-direction: column;
                span {
                  text-decoration: underline;
                  cursor: pointer;
                }
              `}
            >
              <span
                onClick={() =>
                  dispatch(openModal('PolicyModal', { policy: 'privacy' }))
                }
              >
                Privacy Policy
              </span>
              <span
                onClick={() =>
                  dispatch(openModal('PolicyModal', { policy: 'tos' }))
                }
              >
                Terms and Conditions
              </span>
              <span
                onClick={() =>
                  dispatch(
                    openModal('PolicyModal', { policy: 'acceptableuse' })
                  )
                }
              >
                Acceptable Use Policy
              </span>
            </div> */}
          </div>
        </SideMenu>
        <SettingsContainer>
          <SettingsColumn>
            <div
              css={`
                max-width: 600px;
                overflow-y: hidden;
                overflow-x: hidden;
                padding-bottom: 20px;
              `}
            >
              <ContentComponent />
            </div>
          </SettingsColumn>
        </SettingsContainer>
      </Container>
    </Modal>
  )
}