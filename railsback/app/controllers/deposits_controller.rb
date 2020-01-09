class DepositsController < ApplicationController
  before_action :set_deposit, only: [:update, :destroy]
  before_action :authenticate_user!

  # GET /deposits
  def index
    @deposits = Deposit.all
    
    respond_to do |format|
      format.json { render json: @deposits }
    end
  end

  # POST /deposits
  def create
    @deposit = Deposit.new(deposit_params)

    respond_to do |format|
      if @deposit.save
        format.json { render json: @deposit, status: :created }
      else
        format.json { render json: @deposit.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /deposits/1
  def update
    respond_to do |format|
      if @deposit.update(deposit_params)
        format.json { render json: @deposit, status: :created }
      else
        format.json { render json: @deposit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /deposits/1
  def destroy
    respond_to do |format|
      @deposit.destroy
      format.json { head :no_content }
    end
  end

private
  def set_deposit
    @deposit = Deposit.find(params[:id])
  end

  def deposit_params
    params.require(:deposit).permit(:bank, :date_start, :date_end, :amount, :percent)
  end
  
end
