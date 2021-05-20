import boto3
import logging
import os
from pathlib import Path
import subprocess
import stat
from shutil import copyfile
import traceback
import urllib.parse

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def run_command(command):
    command_list = command.split(" ")

    try:
        logger.info(f'Running shell command: "{command}"')
        result = subprocess.run(command_list, stdout=subprocess.PIPE)
        logger.info(
            "Command output:\n---\n{}\n---".format(result.stdout.decode("UTF-8"))
        )
    except Exception as e:
        logger.error(f"Exception: {e}")
        return False
    return True


def lambda_handler(event, context):
    print("Triggered successfully.")

    # configurations
    s3 = boto3.client("s3")
    home_path = "/var/task/"
    tmp_path = "/tmp/"
    scriptname = f"{tmp_path}create-vod-hls.sh"
    bucket_down = event["Records"][0]["s3"]["bucket"]["name"]
    # bucket_up = "chinmay-vod-test-output"
    bucket_up = "vide-bucket100713-staging/output"
    keyname = urllib.parse.unquote_plus(
        event["Records"][0]["s3"]["object"]["key"], encoding="utf-8"
    )
    filename = Path(keyname).name
    filename_base = Path(keyname).stem
    tmp_file_path = f"{tmp_path}{filename}"
    tmp_output_dir = f"{tmp_path}{filename_base}"
    script_cmd_str = f"{scriptname} {tmp_file_path} {tmp_output_dir}"
    s3down_cmd_str = f"/opt/aws s3 cp s3://{bucket_down}/{keyname} {tmp_path}"
    s3sync_cmd_str = (
        f"/opt/aws s3 sync {tmp_output_dir}/ s3://{bucket_up}/{filename_base}/"
    )
    
    # log everything
    print(f"Down bucket: {bucket_down}")
    print(f"Keyname: {keyname}")
    print(f"Filename: {filename}")
    print(f"Filename Base: {filename_base}")
    print(f"s3down_cmd_str: {s3down_cmd_str}")
    print(f"s3sync_cmd_str: {s3sync_cmd_str}")

    # copy file to /tmp and add execute access
    copyfile(f"{home_path}create-vod-hls.sh", scriptname)
    os.chmod(scriptname, stat.S_IRUSR | stat.S_IWUSR | stat.S_IXUSR)

    # download file to lambda
    run_command(s3down_cmd_str)
    
    run_command(f"ls -al {tmp_path}")

    # transcode file
    run_command(script_cmd_str)

    # upload transcoded output
    run_command(s3sync_cmd_str)
    
    run_command(f"ls -al {tmp_path}")
    #run_command(f"ls -al /opt/")

    return "Successfully triggered"
