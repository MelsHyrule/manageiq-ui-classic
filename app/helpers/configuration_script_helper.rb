module ConfigurationScriptHelper
  include TextualMixins::TextualGroupTags

  def textual_group_properties
    TextualGroup.new(
      _("Properties"),
      %i[hostname ipmi_present ipaddress mac_address provider_name zone]
    )
  end

  def textual_hostname
    {:label => _("Hostname"),
     :icon  => "ff ff-configured-system",
     :value => @record.hostname}
  end

  def textual_ipmi_present
    {:label => _("IPMI Present"), :value => @record.ipmi_present}
  end

  def textual_ipaddress
    {:label => _("IP Address"), :value => @record.ipaddress}
  end

  def textual_mac_address
    {:label => _("Mac address"), :value => @record.mac_address}
  end

  def textual_provider_name
    {:label    => _("Provider"),
     :image    => @record.configuration_manager.decorate.fileicon,
     :value    => @record.configuration_manager.try(:name),
     :explorer => true}
  end

  def textual_zone
    {:label => _("Zone"), :value => @record.configuration_manager.my_zone}
  end

  def textual_inventory_group_properties
    %i[inventory_group_name
       inventory_group_region]
  end

  def textual_inventory_group_name
    {:label => _("Name"), :value => @record.name}
  end

  def textual_inventory_group_region
    {:label => _("Region"), :value => @record.region_description}
  end

  def textual_inventory_group_architecture
    {:label => _("Architecture"), :value => @record.configuration_architecture_name}
  end

  def textual__inventory_group_os
    {:label => _("OS"), :value => @record.operating_system_flavor_name}
  end

  def textual_inventory_group_medium
    {:label => _("Medium"), :value => @record.customization_script_medium_name}
  end

  def textual_inventory_group_partition_table
    {:label => _("Partition Table"), :value => @record.customization_script_ptable_name}
  end

  def textual_configuration_script_group_properties
    %i[configuration_script_name
       configuration_script_region]
  end

  def textual_configuration_script_name
    {:label => _("Name"), :value => @record.name}
  end

  def textual_configuration_script_region
    {:label => _("Region"), :value => @record.region_description}
  end

  def mels
    p "printing textual_configuration_script_variables #{textual_configuration_script_variables()}"
    textual_configuration_script_variables()
    ## show.html.haml is not built to receive a []

    ##"printing textual_configuration_script_variables {:title=>\"Variables\", :headers=>[\"Name\", \"Value\"], 
    ## :col_order=>[\"name\", \"value\"], :value=>[{:name=>\"win_update_cat_names\", 
    ## :value=>\"[\\\"CriticalUpdates\\\", \\\"SecurityUpdates\\\"]\"}, {:name=>\"ansible_user\", :value=>\"cloud-user\"}, 
    ## {:name=>\"ansible_password\", :value=>\"Passw0rd\"}, {:name=>\"ansible_port\", :value=>\"5985\"}, {:name=>\"ansible_connection\", :value=>\"winrm\"}]}"
  end

  def textual_configuration_script_variables
    p "memememememee"
    #<ManageIQ::Providers::AnsibleTower::AutomationManager::ConfigurationWorkflow id: 466, manager_id: 19, manager_ref: nil, name: nil, description: nil, variables: nil, created_at: "2021-07-09 17:36:25", updated_at: "2021-07-09 17:36:25", survey_spec: nil, inventory_root_group_id: nil, type: "ManageIQ::Providers::AnsibleTower::AutomationManag...", parent_id: nil, configuration_script_source_id: nil>

    p "(@record) #{@record}" ## #<ManageIQ::Providers::AnsibleTower::AutomationManager::ConfigurationScript:0x00007fe1f3b3cb08>
    p "textual_variables(@record.variables) #{textual_variables(@record.variables)}"
    textual_variables(@record.variables)

    ## working case
    # [] # if this function returns [] if throws exception
    #fails with --> no implicit conversion of Symbol into Integer [configuration_script/show]

    ## "textual_variables(@record.variables) {:title=>\"Variables\", :headers=>[\"Name\", \"Value\"], :col_order=>[\"name\", \"value\"], :value=>[]}"

  end

  def textual_configuration_script_survey
    p "but does it make it inside?" 
    ## we dont even make it here on a working case
    textual_survey_group(@record.survey_spec['spec'])
  end

  def textual_configuration_script_group_os
    %i[configuration_script_medium
       configuration_script_partition_table]
  end

  def textual_survey_group(items)
    return unless items
    h = {:title     => _("Surveys"),
         :headers   => [_('Question Name'), _('Question Description'), _('Variable'),
                        _('Type'),  _('Min'), _('Max'), _('Default'), _('Required'), _('Choices')],
         :col_order => %w[question_name question_description variable type min max default required choices]}
    h[:value] = items.collect do |item|
      {
        :title                => item['index'],
        :question_name        => item['question_name'],
        :question_description => item['question_description'],
        :variable             => item['variable'],
        :type                 => item['type'],
        :min                  => item['min'],
        :max                  => item['max'],
        :default              => item['default'],
        :required             => item['required'],
        :choices              => item['choices']
      }
    end
    h
  end

  def textual_variables(vars)
    m = {:title=> _("Variables"), :headers=>[_('Name'), _('Value')], :col_order=>%w[name value], :value=>[{:name=>_("Name"), :value=>_("Name")}]}
    ## undefined method `values_at' for #<String:0x00007f9616ad63b8> [configuration_script/show]
    p "vars mels #{vars}" ## empty
    
    # return unless vars ## gives: undefined method `values_at' for nil:NilClass [configuration_script/show]
    
    # return [] if vars.nil? ## gives: no implicit conversion of Symbol into Integer [configuration_script/show]
    
    return {} if vars.nil?

    # return m if vars.nil?

    ## none of the below runs if vars is nil 

    ## bye bug vars holds vars
# {"template_file_proxy"=>"haproxy.cfg.j2", "proxy_config_file_path"=>"/etc/haproxy/haproxy.cfg"}
    h = {:title     => _("Variables"),
         :headers   => [_('Name'), _('Value')],
         :col_order => %w[name value]}

         ##"textual_variables mels mels passed return"

         ##undefined method `values_at' for "textual_variables(@record.variables) ":String [configuration_script/show]
    p "TESTING MY CODE"
    p "Array(vars) #{Array(vars)}"
    h[:value] = vars.collect do |item| ## in a nil case, item will be nothing, there will be no item[0] to apply to_s to 
    # h[:value] = Array(vars).collect do |item| ## here it breaks still 
      {
        :name  => item[0].to_s,
        :value => item[1].to_s
      }
    end
    p "h is mels #{h}"
    ## working case "h is mels {:title=>\"Variables\", :headers=>[\"Name\", \"Value\"], :col_order=>[\"name\", \"value\"], :value=>[]}"
    ##              "h is mels {:title=>\"Variables\", :headers=>[\"Name\", \"Value\"], :col_order=>[\"name\", \"value\"], :value=>[{:name=>\"packages\", :value=>\"httpd\"}]}"
    h
  end
  #"h is mels {:title=>\"Variables\", :headers=>[\"Name\", \"Value\"], :col_order=>[\"name\", \"value\"], :value=>[]}"
  #undefined method `values_at' for #<String:0x00007f961abc6d00> [configuration_script/show]

  def textual_group_smart_management
    TextualTags.new(_("Smart Mels Management"), %i[tags])  ##Smart Management this is what is loaded 
  end
end
#
