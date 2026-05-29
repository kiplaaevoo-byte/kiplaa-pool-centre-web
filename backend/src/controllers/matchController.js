import supabase from "../config/supabase.js";
import calculateWinnings from "../utils/calculateWinnings.js";

export const createMatch = async (req, res) => {
  try {

    const {
      player_two,
      stake_amount
    } = req.body;

    const player_one = req.user.id;

    const { data: playerOne } = await supabase
      .from("users")
      .select("*")
      .eq("id", player_one)
      .single();

    if (
      Number(playerOne.wallet_balance) <
      Number(stake_amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance"
      });
    }

    const winnings =
      calculateWinnings(stake_amount);

    const newBalance =
      Number(playerOne.wallet_balance) -
      Number(stake_amount);

    await supabase
      .from("users")
      .update({
        wallet_balance: newBalance
      })
      .eq("id", player_one);

    const { data, error } = await supabase
      .from("matches")
      .insert([
        {
          player_one,
          player_two,
          stake_amount,
          total_pool: winnings.totalPool,
          winner_amount: winnings.winnerAmount,
          platform_commission:
            winnings.platformCommission
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.status(201).json({
      success: true,
      match: data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const declareWinner = async (req, res) => {
  try {

    const { matchId, winnerId } = req.body;

    const { data: match } = await supabase
      .from("matches")
      .select("*")
      .eq("id", matchId)
      .single();

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found"
      });
    }

    const { data: winner } = await supabase
      .from("users")
      .select("*")
      .eq("id", winnerId)
      .single();

    const newBalance =
      Number(winner.wallet_balance) +
      Number(match.winner_amount);

    await supabase
      .from("users")
      .update({
        wallet_balance: newBalance,
        total_winnings:
          Number(winner.total_winnings) +
          Number(match.winner_amount),
        matches_won:
          Number(winner.matches_won) + 1
      })
      .eq("id", winnerId);

    await supabase
      .from("matches")
      .update({
        winner_id: winnerId,
        status: "completed"
      })
      .eq("id", matchId);

    return res.status(200).json({
      success: true,
      message: "Winner declared successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};