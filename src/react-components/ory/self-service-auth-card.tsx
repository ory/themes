import React from 'react';
import { Card } from '../card';
import { Divider } from '../divider';
import { FilterFlowNodes } from './filter-flow-nodes';
import { SelfServiceFlowForm } from './selfservice-flow-form';
import { ButtonLink } from '../button-link';
import { Message } from '../message';
import { colorSprinkle } from '../../theme/colors.css';
import { gridStyle } from '../../theme';
import { SelfServiceLoginFlow, UiNode } from '@ory/client';
import {
  AdditionalProps,
  SelfServiceAuthCardProps,
  SelfServiceFlow
} from '../../component-types';
import { filterNodesByGroups } from '@ory/integrations/ui';
import { useScriptNode } from './node-script';

type loginCardProps = {
  nodes: UiNode[];
  isLoggedIn: boolean;
} & AdditionalProps;

const $loginSection = ({
  nodes,
  forgotPasswordURL: forgotPasswordUrl,
  signupURL: signupUrl,
  logoutURL: logoutUrl,
  isLoggedIn
}: loginCardProps) => (
  <div className={gridStyle({ gap: 32 })}>
    <Divider />
    <div className={gridStyle({ gap: 16 })}>
      <FilterFlowNodes
        filter={{
          nodes: nodes,
          groups: ['default', 'password'],
          excludeAttributes: 'submit'
        }}
      />
      <ButtonLink href={forgotPasswordUrl}>Forgot Password?</ButtonLink>
    </div>
    <FilterFlowNodes
      filter={{
        nodes: nodes,
        groups: ['password', 'webauthn'],
        attributes: 'submit'
      }}
    />
    <Message className={colorSprinkle({ color: 'foregroundMuted' })}>
      {isLoggedIn ? (
        <ButtonLink href={logoutUrl}>Logout</ButtonLink>
      ) : (
        <>
          Don&apos;t have an account?&nbsp;
          <ButtonLink href={signupUrl}>Sign up</ButtonLink>
        </>
      )}
    </Message>
  </div>
);

const $messageSection = (text: string, url: string, buttonText: string) => (
  <Message className={colorSprinkle({ color: 'foregroundMuted' })}>
    {text}&nbsp;
    <ButtonLink href={url}>{buttonText}</ButtonLink>
  </Message>
);

type registrationCard = {
  nodes: UiNode[];
  loginUrl: string;
};

const $registrationSection = ({ nodes, loginUrl }: registrationCard) => (
  <div className={gridStyle({ gap: 32 })}>
    <Divider />
    <div className={gridStyle({ gap: 16 })}>
      <FilterFlowNodes
        filter={{
          nodes: nodes,
          groups: ['default', 'password'],
          excludeAttributes: 'submit'
        }}
      />
    </div>
    <FilterFlowNodes
      filter={{
        nodes: nodes,
        groups: ['password'],
        attributes: 'submit'
      }}
    />
    {$messageSection('Already have an account?', loginUrl, 'Sign in')}
  </div>
);

type alternativeFlowCard = {
  nodes: UiNode[];
  loginUrl: string;
  signupUrl: string;
};

const $alternativeFlowCard = ({
  nodes,
  loginUrl,
  signupUrl
}: alternativeFlowCard) => (
  <div className={gridStyle({ gap: 32 })}>
    <div className={gridStyle({ gap: 16 })}>
      <FilterFlowNodes
        filter={{
          nodes: nodes,
          groups: ['default', 'link'],
          excludeAttributes: 'submit'
        }}
      />
    </div>
    <FilterFlowNodes
      filter={{
        nodes: nodes,
        groups: ['link'],
        attributes: 'submit'
      }}
    />
    {loginUrl &&
      $messageSection('Already have an account?', loginUrl, 'Sign in')}
    {signupUrl &&
      $messageSection("Don't have an account?", signupUrl, 'Sign up')}
  </div>
);

const $oidcSection = (flow: SelfServiceFlow) => {
  const hasOIDC =
    filterNodesByGroups({
      nodes: flow.ui.nodes,
      groups: 'oidc',
      withoutDefaultGroup: true
    }).length > 0;

  return hasOIDC ? (
    <SelfServiceFlowForm flow={flow}>
      <div className={gridStyle({ gap: 32 })}>
        <Divider />
        <FilterFlowNodes
          filter={{
            nodes: flow.ui.nodes,
            groups: ['oidc'],
            attributes: 'submit'
          }}
        />
      </div>
    </SelfServiceFlowForm>
  ) : null;
};

export const SelfServiceAuthCard = ({
  flow,
  title,
  flowType,
  additionalProps
}: SelfServiceAuthCardProps) => {
  useScriptNode({ nodes: flow.ui.nodes });

  let $card = null;
  let $oidc = null;

  let f;
  let isLoggedIn = false;

  switch (flowType) {
    case 'login':
      $oidc = $oidcSection(flow);
      f = flow as SelfServiceLoginFlow;
      // the user might need to logout on the second factor page.
      isLoggedIn = f.refresh || f.requested_aal === 'aal2';
      $card = $loginSection({
        nodes: flow.ui.nodes,
        isLoggedIn,
        ...additionalProps
      });
      break;
    case 'registration':
      $oidc = $oidcSection(flow);
      $card = $registrationSection({
        nodes: flow.ui.nodes,
        loginUrl: additionalProps.loginURL || ''
      });
      break;
    // both verification and recovery use the same flow.
    case 'recovery':
    case 'verification':
      $card = $alternativeFlowCard({
        nodes: flow.ui.nodes,
        loginUrl: additionalProps.loginURL || '',
        signupUrl: additionalProps.signupURL || ''
      });
      break;
    default:
      $card = null;
  }

  return (
    <Card title={title}>
      <div className={gridStyle({ gap: 32 })}>
        {$oidc && $oidc}
        {$card && (
          <SelfServiceFlowForm flow={flow} submitOnEnter={true}>
            {$card}
          </SelfServiceFlowForm>
        )}
      </div>
    </Card>
  );
};