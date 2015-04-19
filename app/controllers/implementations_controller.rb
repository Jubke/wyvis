class ImplementationsController < ApplicationController
  expose(:scenario)
  expose(:implementation, attributes: :implementation_params)
  expose(:library) { implementation.library }

  def new
  end

  # GET /implementations/1
  # GET /implementations/1.js
  def show    
    render layout: 'wide_content'
  end

  def remote
    @implementation = Implementation.find( params[:id] ).decorate
    @index = params[:index]
    
    respond_to do |format|
      format.js
    end
  end

  # GET /implmentations/1/frame
  def frame
    render layout: 'frame'
  end

  # GET /implmentations/1/edit
  def edit
  end

  # POST /scenarios/1/implementations
  def create
    if implementation.save
      redirect_to scenario, notice: 'Implementation was successfully created.'
    else
      render :new 
    end
  end

    # PATCH/PUT /implmentations/1
  def update
    if implementation.save
      redirect_to scenario_implementation_path(scenario,implementation), notice: 'Scenario was successfully updated.'
    else
      render :edit
    end
  end

  def add_stats
    new_value = params.require(:implementation)[:new_value].to_f

    if !new_value.nil?
      old_average = implementation.execution_time
      old_count = implementation.execution_count
      new_average = calc_new_average(old_count, old_average, new_value)

      implementation.execution_count += 1
      implementation.execution_time = new_average

      if implementation.save
        render 'add_stats.json', :locals => {:success => true}
      else
        render 'add_stats.json', :locals => {:success => false, :errors => implementation.errors}
      end
    else
      render 'add_stats.json', :locals => {:success => false, :errors => "no value"}
    end
  end

  # DELETE /implementations/1
  def destroy
    implementation.destroy
    redirect_to scenario, notice: 'Implementation was successfully destroyed.'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def implementation_params
      p = params.permit(:scenario_id)
      p.merge params.require(:implementation).permit(:library_id, :execution_time, :update_time)
    end

    def calc_new_average(old_count, old_average, new_value)
      old_average + ((new_value - old_average) / (old_count + 1))
    end
end
