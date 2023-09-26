import {
  useAddress,
  useChain,
  useContract,
  ConnectWallet,
  Web3Button,
  useNFTBalance,
} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { useState, useEffect, useMemo } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { AddressZero } from "@ethersproject/constants";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vote = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  console.log("👋 Address:", address);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Initialize our Edition Drop contract
  const editionDropAddress = "0x79D9d9dadDf68E0aF34eC6434afB8365655c4999";
  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop",
    80001
  );
  // Hook to check if the user has our NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");
  const chainConnect = useChain();

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0);
  }, [nftBalance]);

  // Initialize our token contract
  const { contract: token } = useContract(
    "0x9CD97b01e1E042cE63656E4E6EdC75f2610Ff323",
    "token"
  );

  const { contract: vote } = useContract(
    "0xa2699D854Ce73005F181B28bB3770c81b3dc1E7A",
    "vote"
  );

  // Holds the amount of token each member has in state.
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  // The array holding all of our members addresses.
  const [memberAddresses, setMemberAddresses] = useState([]);

  // A fancy function to shorten someones wallet address, no need to show the whole thing.
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // Retrieve all our existing proposals from the contract.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // A simple call to vote.getAll() to grab the proposals.
    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        const activeProposals = proposals.filter(
          (proposal) => proposal.state === 1
        );
        setProposals(activeProposals);
        console.log("🌈 Proposals:", proposals);
      } catch (error) {
        console.log("failed to get proposals", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  // We also need to check if the user already voted.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // If we haven't finished retrieving the proposals from the useEffect above
    // then we can't check if the user voted yet!
    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const activeProposal = proposals[0];
        if (activeProposal.state === 1) {
          const hasVoted = await vote.hasVoted(
            activeProposal.proposalId,
            address
          );
          setHasVoted(hasVoted);
          if (hasVoted) {
            console.log("🥵 User has already voted");
          } else {
            console.log("🙂 User has not voted yet");
          }
        }
      } catch (error) {
        console.error("Failed to check if wallet has voted", error);
      }
    };
    checkIfUserHasVoted();
  }, [hasClaimedNFT, proposals, address, vote]);

  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    // with tokenId 0.
    const getAllAddresses = async () => {
      try {
        const memberAddresses =
          await editionDrop?.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log("🚀 Members addresses", memberAddresses);
      } catch (error) {
        console.error("failed to get member list", error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop?.history]);

  // This useEffect grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token?.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("👜 Amounts", amounts);
      } catch (error) {
        console.error("failed to get member balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token?.history]);

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      // We're checking if we are finding the address in the memberTokenAmounts array.
      // If we are, we'll return the amount of token the user has.
      // Otherwise, return 0.
      const member = memberTokenAmounts?.find(
        ({ holder }) => holder === address
      );

      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

  if (address && chainConnect.chainId !== ChainId.Mumbai) {
    return (
      <div className="unsupported-network">
        <h2>Please connect to Mumbai</h2>
        <p>
          This dapp only works on the Mumbai network, please switch networks in
          your connected wallet.
        </p>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <Box
        m="20px"
        sx={{
          ".card": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "3.1px 6.2px 6.2px hsl(0deg 0% 0% / 0.4)",
          },
          ".vote": {
            backgroundColor: "white",
            color: "#000",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="DaoGameToken Member Page"
            subtitle="Congratulations on being a member"
          />
          <ConnectWallet
            style={{
              backgroundColor: "#1F2A40",
              color: "white",
              border: "1px solid white",
            }}
          />
        </Box>

        <div className="member-page">
          <div>
            <div>
              <h2>Member List</h2>
              <table className="card">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Token Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {memberList.map((member) => {
                    return (
                      <tr key={member.address}>
                        <td>{shortenAddress(member.address)}</td>
                        <td>{member.tokenAmount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    window.location.href = "/form";
                  }}
                >
                  Create New Proposal
                </Button>
              </Box>
            </div>
            <div>
              <h2>Active Proposals</h2>
              <form
                onSubmit={async (e) => {
                  console.log("FORMULARIO ENVIADOOOOOO");
                  e.preventDefault();
                  e.stopPropagation();

                  // Before we do async things, we want to disable the button to prevent double clicks
                  setIsVoting(true);

                  // Lets get the votes from the form for the values
                  const votes = proposals.map((proposal) => {
                    const voteResult = {
                      proposalId: proposal.proposalId,
                      // Abstain by default
                      vote: 2,
                    };
                    proposal.votes.forEach((vote) => {
                      console.dir(vote);
                      const elem = document.getElementById(
                        proposal.proposalId + "-" + vote.type
                      );

                      if (elem.checked) {
                        voteResult.vote = vote.type;
                        return;
                      }
                    });
                    return voteResult;
                  });

                  // First, we need to make sure the user delegates their token to vote
                  try {
                    // We'll check if the wallet still needs to delegate their tokens before they can vote
                    const delegation = await token.getDelegationOf(address);
                    // If the delegation is the 0x0 address that means they have not delegated their governance tokens yet
                    if (delegation === AddressZero) {
                      // If they haven't delegated their tokens yet, we'll have them delegate them before voting
                      await token.delegateTo(address);
                    }
                    // Then, we need to vote on the proposals
                    try {
                      await Promise.all(
                        votes.map(async ({ proposalId, vote: _vote }) => {
                          // Before voting, we first need to check whether the proposal is open for voting
                          // We first need to get the latest state of the proposal
                          const proposal = await vote.get(proposalId);
                          // Then, we check if the proposal is open for voting (state === 1 means it is open)
                          if (proposal.state === 1) {
                            // If it is open for voting, we'll vote on it
                            return vote.vote(proposalId, _vote);
                          }
                          // If the proposal is not open for voting, we just return nothing, letting us continue
                          return;
                        })
                      );
                      try {
                        // If any of the proposals are ready to be executed, we'll need to execute them
                        // A proposal is ready to be executed if it is in state 4
                        await Promise.all(
                          votes.map(async ({ proposalId }) => {
                            // We'll first get the latest state of the proposal again, since we may have just voted before
                            const proposal = await vote.get(proposalId);

                            // If the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
                            if (proposal.state === 4) {
                              return vote.execute(proposalId);
                            }
                          })
                        );
                        // If we get here, that means we successfully voted, so let's set the "hasVoted" state to true
                        setHasVoted(true);
                        // And log out a success message
                        console.log("Successfully voted");
                      } catch (err) {
                        console.error("Failed to execute votes", err);
                      }
                      toast.success("¡Voto realizado con éxito!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    } catch (err) {
                      console.error("Failed to vote", err);
                      toast.error("Error al realizar el voto", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                  } catch (err) {
                    console.error("Failed to delegate tokens");
                  } finally {
                    // In either case, we need to set the isVoting state to false to enable the button again
                    setIsVoting(false);
                  }
                }}
              >
                {proposals.length > 0 ? (
                  proposals.map((proposal) => {
                    console.dir(proposals);
                    return (
                      <div key={proposal.proposalId} className="card">
                        <h5>{proposal.description}</h5>
                        <div>
                          {proposal.votes.map(({ type, label }) => (
                            <div key={type}>
                              <input
                                type="radio"
                                id={proposal.proposalId + "-" + type}
                                name={proposal.proposalId}
                                value={type}
                                // Default the "abstain" vote to checked
                                defaultChecked={type === 2}
                              />
                              <label htmlFor={proposal.proposalId + "-" + type}>
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>There are no proposals available at this time.</p>
                )}
                {proposals.length > 0 && (
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      {isVoting
                        ? "Voting..."
                        : hasVoted
                        ? "You Already Voted"
                        : "Submit Votes"}
                    </Button>
                    {!hasVoted && (
                      <small>
                        This will trigger multiple transactions that you will
                        need to sign.
                      </small>
                    )}
                  </Box>
                )}
              </form>
            </div>
          </div>
        </div>
      </Box>
    );
  }

  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Mint your free DaoGameToken Membership NFT"
          subtitle="to participate in our voting system"
        />
      </Box>
      <div className="mint-nft">
        <div className="btn-hero">
          <Web3Button
            contractAddress={editionDropAddress}
            action={(contract) => {
              contract.erc1155.claim(0, 1);
            }}
            onSuccess={() => {
              console.log(
                `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
              );
            }}
            onError={(error) => {
              console.error("Failed to mint NFT", error);
            }}
          >
            Mint your NFT (FREE)
          </Web3Button>
        </div>
      </div>
    </Box>
  );
};

export default Vote;
