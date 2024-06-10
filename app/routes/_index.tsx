import { useEffect, useState, useCallback } from 'react';

import { Principal } from '@dfinity/principal'

import { idlFactory } from '../idls/icrc2.did';

export default function Index() {
  const [actor, setActor] = useState()

  const connect = useCallback(async () => {
    await window.ic.plug.requestConnect({ whitelist: ['zc5ct-kaaaa-aaaah-qddga-cai'] })
    const actor = await window.ic.plug.createActor({ interfaceFactory: idlFactory, canisterId: 'zc5ct-kaaaa-aaaah-qddga-cai' })
    setActor(actor)
  }, [])

  const callApprove = useCallback(() => {
    if (!actor) return Promise.reject('No actor')


    return actor.icrc2_approve({
      spender: {
        owner: Principal.from('e344b-tjf6e-yey57-q2mkx-jkpnl-232ia-lfnfj-6kqvy-75vtv-6dlgk-lqe'),
        subaccount: []
      },
      amount: 10000n,
      fee: [1n],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      expected_allowance: [],
      expires_at: []
    })
  }, [actor])

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <button onClick={() => connect().catch(console.log)}>Connect</button>
      <button onClick={() => callApprove().catch(console.log)}>APPROVE</button>
    </div>
  );
}
