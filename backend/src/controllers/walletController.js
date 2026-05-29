import supabase from "../config/supabase.js";

export const depositFunds = async (req, res) => {
  try {

    const { amount } = req.body;

    const userId = req.user.id;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    const newBalance =
      Number(user.wallet_balance) + Number(amount);

    await supabase
      .from("users")
      .update({
        wallet_balance: newBalance
      })
      .eq("id", userId);

    await supabase
      .from("wallet_transactions")
      .insert([
        {
          user_id: userId,
          transaction_type: "deposit",
          amount
        }
      ]);

    return res.status(200).json({
      success: true,
      message: "Deposit successful"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getWallet = async (req, res) => {
  try {

    const userId = req.user.id;

    const { data } = await supabase
      .from("users")
      .select("wallet_balance,total_winnings")
      .eq("id", userId)
      .single();

    return res.status(200).json({
      success: true,
      wallet: data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};